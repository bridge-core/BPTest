import { Tickable } from '../types/tickable'

export class TickablePool implements Tickable {
	protected tickables = new Set<Tickable>()

	tick(currentTick: number) {
		this.tickables.forEach((component) => component.tick(currentTick))
	}
	removeTickable(tickable: Tickable) {
		this.tickables.delete(tickable)
	}
	addTickable(tickable: Tickable) {
		this.tickables.add(tickable)
	}
}
