import { Entity } from './main'
import { Component } from './components/main'

export class ComponentGroupManager {
	protected componentGroups = new Map<string, ComponentGroup>()

	constructor(protected entity: Entity) {}

	addComponentGroup(groupName: string) {
		const componentGroup = this.componentGroups.get(groupName)
		if (!componentGroup)
			throw new Error(`Undefined component group: "${groupName}"`)

		componentGroup.add()
	}

	removeComponentGroup(groupName: string) {
		const componentGroup = this.componentGroups.get(groupName)
		if (!componentGroup)
			throw new Error(`Undefined component group: "${groupName}"`)

		componentGroup.remove()
	}
}

class ComponentGroup {
	protected components = new Map<string, Component>()

	constructor(protected entity: Entity) {}

	add() {
		this.components.forEach((component, componentName) =>
			this.entity.activateComponent(componentName, component)
		)
	}

	remove() {
		this.components.forEach((_, componentName) =>
			this.entity.deactivateComponent(componentName)
		)
	}
}
