import { Tickable } from '../../types/tickable';
export declare class Component {
    reset(): void;
}
export declare abstract class TickableComponent extends Component implements Tickable {
    abstract tick(currentTick: number): void;
}
