import { trigger } from '../../utils/EventSystem'
import { Filter } from './main'

export class HasTarget extends Filter {
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

		// A target is valid if it is still alive & not the entity itself
		return (
			this.entity.getTarget('target').isAlive &&
			this.entity.getTarget('target') !== this.entity
		)
	}
}
