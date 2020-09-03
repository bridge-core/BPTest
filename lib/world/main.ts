import { Entity } from '../entity/main'
import { Position } from './position'

export interface WorldConfig {
	isExperimental: boolean
}

export class World {
	protected entityPool = new Set<Entity>()
	protected isExperimental: boolean
	protected nextEntityId = 0
	protected entityCount = 0

	constructor({ isExperimental }: WorldConfig) {
		this.isExperimental = isExperimental
	}

	getIsExperimental() {
		return this.isExperimental
	}
	getEntityCount() {
		return this.entityCount
	}

	addEntity(entity: Entity) {
		this.entityPool.add(entity)
		this.entityCount++
		this.nextEntityId++
		entity.flags.set('numericalIdentifier', this.nextEntityId)
	}
	deleteEntity(entity: Entity) {
		this.entityPool.delete(entity)
		this.entityCount--
	}

	nearbyEntities(position: Position, radius: number) {
		return [...this.entityPool].filter((entity) =>
			entity.position.isWithin(position, radius)
		)
	}
}
