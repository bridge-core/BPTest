import { Filter } from './main'
import { trigger } from '../../utils/EventSystem'

export class HasComponent extends Filter {
	get filterValue() {
		if (typeof this.value !== 'string') {
			trigger(
				'error',
				new Error(
					`Value to compare against is of type ${typeof this
						.value}, expected string`
				)
			)
			return false
		}

		return this.entity.getActiveComponent(this.value) !== undefined
	}

	eval() {
		if (this.operator === '==') return this.filterValue
		else if (this.operator === '!=') return !this.filterValue

		trigger(
			'error',
			new Error(
				`Invalid operator for ${this.constructor.name} filter: ${this.operator}`
			)
		)
		return false
	}
}
