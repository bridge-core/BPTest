import { Entity } from '../main'
import { Component, ComponentData } from './main'

export class Variant implements Component {
	public readonly value: number = 0

	constructor(entity: Entity, componentData: ComponentData) {
		if (Array.isArray(componentData))
			throw new Error(
				`Invalid componentData type: Expected object, found array`
			)
		if (typeof componentData?.value !== 'number')
			throw new Error(
				`Invalid type for value property: Expected number, found ${typeof componentData?.value}`
			)
		this.value = componentData?.value ?? 0
	}

	reset() {}
	tick() {}
}
