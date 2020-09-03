import { Entity } from '../main'

export class Filter {
	constructor(protected entity: Entity, filterData: unknown) {}

	eval() {
		return true
	}
}
