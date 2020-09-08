import { Entity } from '../entity/main'
import { Position } from './position'
import { trigger } from '../utils/EventSystem'

export interface WorldConfig {
	isExperimental: boolean
}

export class World {
	protected entityPool = new Set<Entity>()
	protected isExperimental: boolean
	protected entityRegistry = new Map<string, unknown>()
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
	allEntities() {
		return [...this.entityPool]
	}

	registerEntity(entityData: any) {
		const identifier =
			entityData['minecraft:entity']?.description?.identifier
		this.entityRegistry.set(identifier, entityData)
	}
	summon(identifier: string) {
		const entityData = this.entityRegistry.get(identifier)
		if (entityData !== undefined) return new Entity(this, entityData)

		trigger(
			'error',
			new Error(
				`Cannot summon entity with identifier "${identifier}": This entity does not exist`
			)
		)
	}
}
