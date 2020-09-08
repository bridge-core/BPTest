import { Entity } from '../main'
import { ComponentData } from '../componentLib'
import { Component } from './_generic'

export class Variant extends Component {
	protected value: number = 0

	constructor(entity: Entity, componentData: ComponentData) {
		super()
		if (Array.isArray(componentData))
			throw new Error(
				`${this.constructor.name}: Invalid componentData type: Expected object, found array`
			)
		if (typeof componentData?.value !== 'number')
			throw new Error(
				`${
					this.constructor.name
				}: Invalid type for value property: Expected number, found ${typeof componentData?.value}`
			)
		this.value = componentData?.value ?? 0
	}

	getValue() {
		return this.value
	}
}
