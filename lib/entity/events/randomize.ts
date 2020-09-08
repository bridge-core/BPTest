import { Entity } from '../main'
import { IEvent, createEvent } from './main'

export class SubEventRandomize implements IEvent {
	protected randomize: [number, IEvent][] = []
	protected maxWeight = 0

	constructor(protected entity: Entity, rawSequence: unknown[]) {
		for (const entry of rawSequence) {
			const event = createEvent(entity, entry as Record<string, unknown>)
			if (!event) continue

			const currentWeight = (entry as any)?.weight ?? 1
			this.maxWeight += currentWeight
			this.randomize.push([currentWeight, event])
		}
	}

	trigger() {
		const chosenMaxWeight = Math.round(Math.random() * this.maxWeight)
		let currentWeight = 0
		for (const [weight, event] of this.randomize) {
			if (chosenMaxWeight >= currentWeight) return event.trigger()

			currentWeight += weight
		}
	}
}
