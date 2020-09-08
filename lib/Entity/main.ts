import { ComponentGroupManager } from './groupStore'
import { Component, TickableComponent } from './components/_generic'
import { createQueryEnv } from './molang/queries'
import { execute as executeMoLang } from 'molang'
import { EntityFlags } from './flags'
import { World } from '../world/main'
import { Position } from '../world/position'
import { TargetRegistry, Target } from './targets'
import { TickablePool } from '../world/tickablePool'

export class Entity extends TickablePool {
	public readonly position = new Position(0, 0, 0)
	public readonly flags = new EntityFlags(this)

	protected targetRegistry = new TargetRegistry(this)
	protected componentGroups = new ComponentGroupManager(this)
	protected activeComponents = new Map<string, Component>()

	protected queryEnv = createQueryEnv(this)

	constructor(protected world: World, serverEntity: any) {
		super()
		this.world.addEntity(this)
		this.targetRegistry.set('self', this)

		if ('minecraft:entity' in serverEntity) {
		}
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
	triggerEvent(eventName: string) {}

	getActiveComponent(componentName: string) {
		return this.activeComponents.get(componentName)
	}
	getWorld() {
		return this.world
	}
	getTarget(target?: Target) {
		if (!target) return this
		return this.targetRegistry.get(target)
	}

	kill() {
		this.world.deleteEntity(this)
	}
}
