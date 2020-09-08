import { Entity } from '../main'
import { SubEventTrigger } from './trigger'
import { SubEventSequence } from './sequence'
import { SubEventWeight } from './weight'
import { trigger } from '../../utils/EventSystem'

export interface IEvent {
	trigger: () => void
}

export class SubEvent implements IEvent {
	protected addGroups: string[]
	protected removeGroups: string[]

	constructor(protected entity: Entity, rawData: Record<string, unknown>) {
		this.addGroups = (rawData.add as any)?.component_groups ?? []
		this.removeGroups = (rawData.remove as any)?.component_groups ?? []
	}

	trigger() {
		this.removeGroups.forEach((group) =>
			this.entity.componentGroups.removeComponentGroup(group)
		)
		this.addGroups.forEach((group) =>
			this.entity.componentGroups.addComponentGroup(group)
		)
	}
}

export function createEvent(entity: Entity, rawData: Record<string, unknown>) {
	for (const [action, actionData] of Object.entries(rawData)) {
		if (action === 'add' || action === 'remove')
			return new SubEvent(entity, rawData)
		else if (action === 'sequence')
			return new SubEventSequence(entity, actionData as unknown[])
		else if (action === 'randomize')
			return new SubEventSequence(entity, actionData as unknown[])
		else if (action === 'trigger')
			return new SubEventTrigger(entity, actionData)
		else if (action === 'weight') return new SubEventWeight()
	}
}

export class EventManager {
	protected events = new Map<string, IEvent>()

	constructor(entity: Entity, events: Record<string, unknown>) {
		Object.entries(events).map(([eventName, eventData]) => {
			const event = createEvent(
				entity,
				eventData as Record<string, unknown>
			)
			if (event) this.events.set(eventName, event)
		})
	}

	trigger(eventName: string) {
		const event = this.events.get(eventName)
		if (!event)
			return trigger(
				'error',
				new Error(`Event "${eventName}" not defined on entity`)
			)

		event.trigger()
	}
}
