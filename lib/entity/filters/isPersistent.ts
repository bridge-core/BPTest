import { trigger } from '../../utils/EventSystem'
import { Filter } from './_generic'

export class IsPersistent extends Filter {
	get filterValue() {
		if (typeof this.value !== 'boolean') {
			trigger(
				'error',
				new Error(
					`Value to compare against is of type ${typeof this
						.value}, expected boolean`
				)
			)
			return false
		}

		return (
			this.entity.getActiveComponent('minecraft:persistent') !== undefined
		)
	}
}
