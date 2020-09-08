import { Entity } from '../main';
import { IEvent } from './main';
import { Evaluable } from '../filters/main';
export declare class SubEventSequence implements IEvent {
    protected entity: Entity;
    protected sequence: [Evaluable | null, IEvent][];
    constructor(entity: Entity, rawSequence: unknown[]);
    trigger(): void;
}
