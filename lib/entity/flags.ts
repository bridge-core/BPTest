import { Entity } from './main'

export type FlagName =
	| 'canClimb'
	| 'canFly'
	| 'canSwim'
	| 'canWalk'
	| 'isOnFire'
	| 'identifier'
	| 'runtime_identifier'
	| 'isSpawnable'
	| 'isSummonable'
	| 'isExperimental'

export class EntityFlags {
	protected canClimb = false
	protected canFly = false
	protected canSwim = false
	protected canWalk = false

	protected isOnFire = false

	constructor(protected entity: Entity) {}

	set(flagName: FlagName, value: unknown) {
		;(this as Record<string, unknown>)[flagName] = value
	}

	get(flagName: FlagName) {
		return (this as Record<string, unknown>)[flagName]
	}
}
