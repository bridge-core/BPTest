import { Entity } from '../main';
import { IEvent } from './main';
export declare class SubEventRandomize implements IEvent {
    protected entity: Entity;
    protected randomize: [number, IEvent][];
    protected maxWeight: number;
    constructor(entity: Entity, rawSequence: unknown[]);
    trigger(): void;
}
