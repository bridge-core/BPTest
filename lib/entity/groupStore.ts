import { Entity } from './main'
import { Component } from './components/_generic'
import { ComponentData, createComponent } from './componentLib'

export class ComponentGroupManager {
	protected componentGroups = new Map<string, ComponentGroup>()

	constructor(
		protected entity: Entity,
		componentGroups: Record<string, unknown>
	) {
		Object.entries(componentGroups).map(([groupName, components]) =>
			this.createComponentGroup(
				groupName,
				components as Record<string, ComponentData>
			)
		)
	}

	createComponentGroup(
		groupName: string,
		components: Record<string, ComponentData>
	) {
		const group = new ComponentGroup(this.entity, components)
		this.componentGroups.set(groupName, group)
		return group
	}

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

	constructor(
		protected entity: Entity,
		rawComponents: Record<string, ComponentData>
	) {
		Object.entries(rawComponents).map(([componentName, componentData]) => {
			const component = createComponent(
				this.entity,
				componentName,
				componentData as ComponentData
			)
			if (component) this.components.set(componentName, component)
		})
	}

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
