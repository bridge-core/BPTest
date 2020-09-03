import { Entity } from './main'

export type FlagName =
	| 'canClimb'
	| 'canFly'
	| 'canSwim'
	| 'canWalk'
	| 'isOnFire'

export class EntityFlags {
	protected canClimb = false
	protected canFly = false
	protected canSwim = false
	protected canWalk = false

	protected isOnFire = false

	constructor(protected entity: Entity) {}

	set(flagName: FlagName, value: boolean) {
		this[flagName] = value
	}

	get(flagName: FlagName) {
		return this[flagName]
	}
}
