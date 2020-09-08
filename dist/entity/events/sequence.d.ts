import { Entity } from '../main';
import { IEvent } from './main';
import { Filter } from '../filters/main';
export declare class SubEventSequence implements IEvent {
    protected entity: Entity;
    protected sequence: [Filter | null, IEvent][];
    constructor(entity: Entity, rawSequence: unknown[]);
    trigger(): void;
}
