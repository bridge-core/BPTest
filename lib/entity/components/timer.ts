import { Entity } from '../main'
import { ComponentData } from '../componentLib'
import { TickableComponent } from './_generic'
import { EventTrigger } from '../events/eventTrigger'
import { extractNumber, extractBoolean } from './utils'

export class Timer extends TickableComponent {
	protected timeDownEvent: EventTrigger
	protected time: number
	protected looping: boolean
	protected randomInterval: boolean

	protected startTick = -1
	/**
	 * Prevents additional timer iterations with `looping=false`
	 */
	protected isActive = true

	constructor(protected entity: Entity, componentData: ComponentData) {
		super()
		if (Array.isArray(componentData))
			throw new Error(
				`Invalid componentData type: Expected object, found array`
			)
		if (typeof componentData?.value !== 'number')
			throw new Error(
				`Invalid type for value property: Expected number, found ${typeof componentData?.value}`
			)

		this.looping = extractBoolean(componentData, 'looping', true)
		this.randomInterval = extractBoolean(
			componentData,
			'random_interval',
			true
		)
		//Convert time to whole ticks
		this.time = Math.ceil(extractNumber(componentData, 'time', 0) * 20)
		this.timeDownEvent = new EventTrigger(
			entity,
			componentData.time_down_event
		)
	}

	reset() {
		this.startTick = -1
	}

	tick(currentTick: number) {
		if (this.startTick === -1) this.startTick = currentTick

		//Timer should fire this tick
		if (this.startTick + this.time >= currentTick) {
			//Trigger timeDownEvent
			this.timeDownEvent.trigger()

			//The timer isn't supposed to run again
			if (!this.looping) this.entity.removeTickable(this)
			//Make timer ready to run again
			else this.reset()
		}
	}
}
