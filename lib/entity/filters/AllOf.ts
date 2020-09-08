import { Entity } from '../main'
import { createFilter, Evaluable } from './main'

export class AllOf implements Evaluable {
	protected filters: Evaluable[]
	constructor(entity: Entity, rawFilters: unknown[]) {
		this.filters = rawFilters.map((rawFilter) =>
			createFilter(entity, rawFilter)
		)
	}

	eval() {
		for (const filter of this.filters) {
			if (!filter.eval()) return false
		}
		return true
	}
}
