import { ComponentGroupManager } from './groupStore'
import { Component } from './components/main'
import { Tickable } from '../types/tickable'
import { createQueryEnv } from './molang/queries'
import { execute as executeMoLang } from 'molang'
import { EntityFlags } from './flags'
import { World } from '../world/main'
import { Position } from '../world/position'
import { TargetRegistry, Target } from './targets'
export class Entity implements Tickable {
	public readonly position = new Position(0, 0, 0)
	public readonly flags = new EntityFlags(this)

	protected targetRegistry = new TargetRegistry(this)
	protected componentGroups = new ComponentGroupManager(this)
	protected activeComponents = new Map<string, Component>()
	protected queryEnv = createQueryEnv(this)

	constructor(protected world: World) {
		this.world.addEntity(this)
		this.targetRegistry.set('self', this)
	}

	executeMoLang(expression: string) {
		executeMoLang(expression, this.queryEnv)
	}

	activateComponent(componentName: string, component: Component) {
		const oldComponent = this.activeComponents.get(componentName)
		if (oldComponent) oldComponent.reset()

		this.activeComponents.set(componentName, component)
	}
	deactivateComponent(componentName: string) {
		const component = this.activeComponents.get(componentName)
		if (!component)
			throw new Error(
				`Component "${componentName}" cannot be deactivated because it is not active at the moment.`
			)

		component.reset()
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

	tick(currentTick: number) {
		this.activeComponents.forEach((component) =>
			component.tick(currentTick)
		)
	}

	kill() {
		this.world.deleteEntity(this)
	}
}
