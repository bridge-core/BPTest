import { Entity } from '../main'
import { Component, ComponentData } from './main'

export class TypeFamily implements Component {
	protected families: string[]

	constructor(protected entity: Entity, componentData: ComponentData) {
		if (Array.isArray(componentData))
			throw new Error(
				`Invalid componentData type: Expected object, found array`
			)
		if (
			!Array.isArray(componentData?.family) ||
			typeof componentData?.family !== 'string'
		)
			throw new Error(
				`Invalid type for value property: Expected number, found ${typeof componentData?.value}`
			)

		this.families = componentData.family
	}

	getFamilies() {
		return this.families
	}

	reset() {}
	tick() {}
}
