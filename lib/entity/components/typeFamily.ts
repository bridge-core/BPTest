import { Entity } from '../main'
import { ComponentData } from '../componentLib'
import { Component } from './_generic'
import { trigger } from '../../utils/EventSystem'

export class TypeFamily extends Component {
	protected families: string[]

	constructor(protected entity: Entity, componentData: ComponentData) {
		super()
		if (Array.isArray(componentData))
			trigger(
				'error',
				new Error(
					`${this.constructor.name}: Invalid componentData type: Expected object, found array`
				)
			)
		if (
			!Array.isArray((componentData as any)?.family) ||
			typeof (componentData as any)?.family !== 'string'
		)
			trigger(
				'error',
				new Error(
					`${
						this.constructor.name
					}: Invalid type for value property: Expected string or string[], found ${typeof (componentData as any)
						?.family}`
				)
			)

		this.families = (componentData as any)?.family ?? []
	}

	getFamilies() {
		return this.families
	}
}
