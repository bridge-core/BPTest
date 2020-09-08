import { Filter } from './_generic'

export class DistanceToNearestPlayer extends Filter {
	get filterValue() {
		const players: number[] = this.entity
			.getWorld()
			.allEntities()
			.filter(
				(currentEntity) =>
					currentEntity.flags.get('identifier') === 'minecraft:player'
			)
			.map((currentEntity) =>
				this.entity.position.distanceTo(currentEntity.position)
			)

		let minDistance = Infinity
		for (const distance of players) {
			if (minDistance > distance) minDistance = distance
		}

		return minDistance
	}
}
