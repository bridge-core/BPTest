import { ComponentGroupManager } from './groupStore'
import { Component, TickableComponent } from './components/_generic'
import { createQueryEnv } from './molang/queries'
import { execute as executeMoLang } from 'molang'
import { EntityFlags } from './flags'
import { World } from '../world/main'
import { Position } from '../world/position'
import { TargetRegistry, Target } from './targets'
import { TickablePool } from '../world/tickablePool'
import { trigger } from '../utils/EventSystem'
import { EventManager } from './events/main'
import { Health } from './components/health'

export class Entity extends TickablePool {
	public readonly position = new Position(0, 0, 0)
	public readonly flags = new EntityFlags(this)
	public readonly tags = new Set<string>()

	protected targetRegistry = new TargetRegistry(this)
	protected activeComponents = new Map<string, Component>()
	protected events: EventManager
	public readonly componentGroups: ComponentGroupManager

	protected queryEnv = createQueryEnv(this)

	constructor(protected world: World, serverEntity: any) {
		super()
		this.world.addEntity(this)
		this.targetRegistry.set('self', this)

		const {
			description,
			component_groups: componentGroups,
			components,
			events,
		} = serverEntity['minecraft:entity'] || {}

		// Load the entity description
		if (!description)
			trigger('error', new Error(`Entity has no valid description`))
		this.flags.set('identifier', description.identifier)
		this.flags.set('runtimeIdentifier', description.runtime_identifier)
		this.flags.set('isSpawnable', description.is_spawnable)
		this.flags.set('isSummonable', description.is_summonable)
		this.flags.set('isExperimental', description.is_experimental)
		// TODO: Load scripts & animations
		// const { scripts, animations } = description || {}

		// Load component groups
		this.componentGroups = new ComponentGroupManager(
			this,
			componentGroups ?? {}
		)

		if (components) {
			// Components are just a component group which is added by default
			// The component group name maps to the entity's identifier
			const defaultGroup = this.componentGroups.createComponentGroup(
				this.flags.get('identifier') as string,
				components
			)
			defaultGroup.add()
		}

		this.events = new EventManager(this, events ?? {})
	}

	executeMoLang(expression: string) {
		executeMoLang(expression, this.queryEnv)
	}

	activateComponent(componentName: string, component: Component) {
		const oldComponent = this.activeComponents.get(componentName)
		if (oldComponent) oldComponent.reset()

		// Make sure components get ticked/no longer ticked
		if (oldComponent instanceof TickableComponent)
			this.tickables.delete(oldComponent)
		if (component instanceof TickableComponent)
			this.tickables.add(component)

		this.activeComponents.set(componentName, component)
	}
	deactivateComponent(componentName: string) {
		const component = this.activeComponents.get(componentName)
		if (!component)
			throw new Error(
				`Component "${componentName}" cannot be deactivated because it is not active at the moment.`
			)

		// Reset internal component state
		component.reset()
		// No longer tick deactivated component
		if (component instanceof TickableComponent)
			this.tickables.delete(component)
		//Remove component from activeComponents map
		this.activeComponents.delete(componentName)
	}
	triggerEvent(eventName: string) {
		this.events.trigger(eventName)
	}

	getActiveComponent(componentName: string) {
		return this.activeComponents.get(componentName)
	}
	getWorld() {
		return this.world
	}
	getTarget(target?: Target) {
		if (!target) return this
		return this.targetRegistry.get(target) ?? this
	}

	kill() {
		this.world.deleteEntity(this)
	}
	getHealth() {
		return (
			(this.getActiveComponent(
				'minecraft:health'
			) as Health)?.getValue() ?? 20
		)
	}
	get isAlive() {
		return this.getHealth() > 0
	}
}
