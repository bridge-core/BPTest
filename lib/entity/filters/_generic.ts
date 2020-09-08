import { Entity } from '../main'
import { extractString } from '../components/utils'

export interface Evaluable {
	eval: () => boolean
}

export abstract class Filter implements Evaluable {
	protected value: string | number | boolean
	protected operator: string
	abstract readonly filterValue: string | number | boolean

	constructor(protected entity: Entity, filterData: unknown) {
		this.operator = extractString(filterData, 'operator', '==')
		// Unify equals/not equals operators
		if (this.operator === '=' || this.operator === 'equals')
			this.operator = '=='
		if (this.operator === '<>' || this.operator === 'not')
			this.operator = '!='

		this.value = (filterData as any).value
	}

	eval() {
		switch (this.operator) {
			case '==':
				return this.value === this.filterValue
			case '!=':
				return this.value !== this.filterValue
			case '<=':
				return this.value <= this.filterValue
			case '>=':
				return this.value >= this.filterValue
			case '<':
				return this.value < this.filterValue
			case '>':
				return this.value > this.filterValue
		}

		return false
	}
}
