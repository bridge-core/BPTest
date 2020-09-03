import { Entity } from './main'

export type Target =
	| 'self'
	| 'target'
	| 'other'
	| 'player'
	| 'parent'
	| 'damager'
	| 'block'

export class TargetRegistry {
	protected registry = new Map<Target, Entity>()
	constructor(protected entity: Entity) {}

	set(target: Target, entity: Entity) {
		this.registry.set(target, entity)
	}

	get(target: Target) {
		return this.registry.get(target)
	}
}
