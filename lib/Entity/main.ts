import { ComponentGroupManager } from './groupStore'
import { Component } from './components/main'
import { Tickable } from '../types/tickable'
import { createQueryEnv } from './molang/queries'
import { execute as executeMoLang } from 'molang'
export class Entity implements Tickable {
	public readonly componentGroups = new ComponentGroupManager(this)
	protected activeComponents = new Map<string, Component>()
	protected queryEnv = createQueryEnv(this)

	constructor() {}

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

	getActiveComponent(componentName: string) {
		return this.activeComponents.get(componentName)
	}

	tick(currentTick: number) {
		this.activeComponents.forEach((component) =>
			component.tick(currentTick)
		)
	}
}
