import { Entity } from '../entity/main'

export class World {
	protected entityPool = new Set<Entity>()

	addEntity(entity: Entity) {
		this.entityPool.add(entity)
	}
	deleteEntity(entity: Entity) {
		this.entityPool.delete(entity)
	}
}
