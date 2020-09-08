import { trigger } from '../../utils/EventSystem'
import { HasComponent } from './hasComponent'

export class HasTag extends HasComponent {
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

		return this.entity.tags.has(this.value)
	}
}
