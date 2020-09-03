import { Entity } from './main'

export type FlagName =
	| 'canClimb'
	| 'canFly'
	| 'canSwim'
	| 'canWalk'
	| 'isOnFire'
	| 'isBlocking'
	| 'identifier'
	| 'runtimeIdentifier'
	| 'isSpawnable'
	| 'isSummonable'
	| 'isExperimental'
	| 'numericalIdentifier'

export class EntityFlags {
	protected registry = new Map<FlagName, unknown>()
	constructor(protected entity: Entity) {}

	set(flagName: FlagName, value: unknown) {
		this.registry.set(flagName, value)
	}

	get(flagName: FlagName) {
		return this.registry.get(flagName)
	}
}
