import { Tickable } from '../types/tickable';
export declare class TickablePool implements Tickable {
    protected tickables: Set<Tickable>;
    tick(currentTick: number): void;
    removeTickable(tickable: Tickable): void;
    addTickable(tickable: Tickable): void;
}
