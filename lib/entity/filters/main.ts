import { Entity } from '../main'
import { extractString } from '../components/utils'
import { DistanceToNearestPlayer } from './distanceToNearestPlayer'
import { HasComponent } from './hasComponent'
import { AllOf } from './AllOf'
import { AnyOf } from './AnyOf'
import { NoneOf } from './NoneOf'
import { HasTag } from './hasTag'
import { HasTarget } from './hasTarget'

export interface Evaluable {
	eval: () => boolean
}

export abstract class Filter implements Evaluable {
	protected value: string | number | boolean
	protected operator: string
	abstract readonly filterValue: string | number | boolean

	constructor(protected entity: Entity, filterData: unknown) {
		this.operator = extractString(filterData, 'operator', '==')
		// Unify equals/not equals operators
		if (this.operator === '=' || this.operator === 'equals')
			this.operator = '=='
		if (this.operator === '<>' || this.operator === 'not')
			this.operator = '!='

		this.value = (filterData as any).value
	}

	eval() {
		switch (this.operator) {
			case '==':
				return this.value === this.filterValue
			case '!=':
				return this.value !== this.filterValue
			case '<=':
				return this.value <= this.filterValue
			case '>=':
				return this.value >= this.filterValue
			case '<':
				return this.value < this.filterValue
			case '>':
				return this.value > this.filterValue
		}

		return false
	}
}

class DummyFilter extends Filter {
	readonly filterValue = 0
	eval() {
		return false
	}
}
interface FilterClass {
	new (entity: Entity, filterData: unknown): Filter
}

const filterLib = new Map<string, FilterClass>([
	['distance_to_nearest_player', DistanceToNearestPlayer],
	['has_component', HasComponent],
	['has_tag', HasTag],
	['has_target', HasTarget],
])
export function createFilter(entity: Entity, filterData: any) {
	if (filterData.all_of) return new AllOf(entity, filterData.all_of)
	if (filterData.any_of) return new AnyOf(entity, filterData.all_of)
	if (filterData.none_of) return new NoneOf(entity, filterData.all_of)

	return new (filterLib.get(filterData.test) ?? DummyFilter)(
		entity.getTarget(filterData.subject),
		filterData
	)
}
