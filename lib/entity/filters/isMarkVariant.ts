import { Filter } from './_generic'
import { Variant } from '../components/variant'

export class IsMarkVariant extends Filter {
	get filterValue() {
		return (
			(this.entity.getActiveComponent(
				'minecraft:is_mark_variant'
			) as Variant)?.getValue() ?? 0
		)
	}
}
