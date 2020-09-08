import { Entity } from '../main'
import { IEvent } from './main'
import { trigger } from '../../utils/EventSystem'

export class SubEventTrigger implements IEvent {
	constructor(protected entity: Entity, protected eventToTrigger: unknown) {
		if (typeof eventToTrigger !== 'string')
			trigger(
				'error',
				new Error(
					`event.trigger must be of type string, found ${typeof eventToTrigger}`
				)
			)
	}

	trigger() {
		if (typeof this.eventToTrigger === 'string')
			this.entity.triggerEvent(this.eventToTrigger)
	}
}
