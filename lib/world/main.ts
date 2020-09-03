import { Entity } from '../entity/main'
import { Position } from './position'

export interface WorldConfig {
	isExperimental: boolean
}

export class World {
	protected entityPool = new Set<Entity>()
	protected isExperimental: boolean

	constructor({ isExperimental }: WorldConfig) {
		this.isExperimental = isExperimental
	}

	getIsExperimental() {
		return this.isExperimental
	}

	addEntity(entity: Entity) {
		this.entityPool.add(entity)
	}
	deleteEntity(entity: Entity) {
		this.entityPool.delete(entity)
	}

	nearbyEntities(position: Position, radius: number) {
		return [...this.entityPool].filter((entity) =>
			entity.position.isWithin(position, radius)
		)
	}
}
