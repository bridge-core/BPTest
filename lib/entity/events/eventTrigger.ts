import { Entity } from '../main'
import { createFilter, Evaluable } from '../filters/main'
import { Target } from '../targets'

export function ensureCorrectType(
	eventTriggerData: unknown
): Record<string, unknown> {
	if (typeof eventTriggerData !== 'object' || eventTriggerData === null)
		throw new Error(
			`Event triggers must be an object, found ${
				eventTriggerData ? typeof eventTriggerData : 'null'
			}`
		)
	if (Array.isArray(eventTriggerData))
		throw new Error(`Event triggers must be an object, found array`)
	return eventTriggerData as Record<string, unknown>
}

export class EventTrigger {
	filters?: Evaluable
	eventName?: string
	target?: Target

	constructor(protected entity: Entity, eventTriggerData: unknown) {
		const data = ensureCorrectType(eventTriggerData)

		if (data?.filters) this.filters = createFilter(entity, data?.filters)
		if (data?.event) {
			if (typeof data?.event !== 'string')
				throw new Error(
					`Event name needs to be of type string, found ${typeof data?.event}`
				)
			this.eventName = data?.event
		}
	}

	trigger() {
		if (!this.eventName) return
		if (this.filters && !this.filters.eval()) return

		const eventTarget = this.entity.getTarget(this.target)
		if (!eventTarget)
			throw new Error(
				`Couldn't trigger event because target "${
					this.target ?? 'self'
				}" resolved to "undefined"`
			)
		eventTarget.triggerEvent(this.eventName)
	}
}
