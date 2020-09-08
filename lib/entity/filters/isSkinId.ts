import { Filter } from './main'
import { Variant } from '../components/variant'

export class IsPersistent extends Filter {
	get filterValue() {
		return (
			(this.entity.getActiveComponent(
				'minecraft:skin_id'
			) as Variant)?.getValue() ?? 0
		)
	}
}
