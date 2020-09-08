import { Filter } from './main'
import { Variant } from '../components/variant'

export class IsVariant extends Filter {
	get filterValue() {
		return (
			(this.entity.getActiveComponent(
				'minecraft:is_variant'
			) as Variant)?.getValue() ?? 0
		)
	}
}
