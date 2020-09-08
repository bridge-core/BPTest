import { Entity } from '../main';
import { IEvent } from './main';
export declare class SubEventTrigger implements IEvent {
    protected entity: Entity;
    protected eventToTrigger: unknown;
    constructor(entity: Entity, eventToTrigger: unknown);
    trigger(): void;
}
