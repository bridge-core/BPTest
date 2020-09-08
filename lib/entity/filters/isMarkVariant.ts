import { Filter } from './main'
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
