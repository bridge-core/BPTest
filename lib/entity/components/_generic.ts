import { Tickable } from '../../types/tickable'

export class Component {
	reset() {}
}
export abstract class TickableComponent extends Component implements Tickable {
	abstract tick(currentTick: number): void
}
