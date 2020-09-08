import { Entity } from '../main'
import { ComponentData } from '../componentLib'
import { Component } from './_generic'

export class Health extends Component {
	protected value = 20
	protected max = 20
	protected min = 0

	constructor(protected entity: Entity, componentData: ComponentData) {
		super()
		if (Array.isArray(componentData))
			throw new Error(
				`Invalid componentData type: Expected object, found array`
			)
		if (typeof componentData?.value !== 'number')
			throw new Error(
				`Invalid type for value property: Expected number, found ${typeof componentData?.value}`
			)
		if (typeof componentData?.max !== 'number')
			throw new Error(
				`Invalid type for max property: Expected number, found ${typeof componentData?.max}`
			)
		if (typeof componentData?.min !== 'number')
			throw new Error(
				`Invalid type for min property: Expected number, found ${typeof componentData?.min}`
			)
		this.value = componentData?.value ?? 0
		this.max = componentData?.max ?? 0
		this.min = componentData?.min ?? 0
	}

	getValue() {
		return this.value
	}
	getMax() {
		return this.max
	}
	getMin() {
		return this.min
	}

	damage(amount: number) {
		this.value -= amount
		if (this.value < this.min) this.value = this.min
		if (this.value <= 0) this.entity.kill()
	}
	heal(amount: number) {
		this.value += amount
		if (this.value > this.max) this.value = this.max
	}
}
