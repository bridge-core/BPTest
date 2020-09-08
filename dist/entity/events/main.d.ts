import { Entity } from '../main';
import { SubEventTrigger } from './trigger';
import { SubEventSequence } from './sequence';
import { SubEventWeight } from './weight';
export interface IEvent {
    trigger: () => void;
}
export declare class SubEvent implements IEvent {
    protected entity: Entity;
    protected addGroups: string[];
    protected removeGroups: string[];
    constructor(entity: Entity, rawData: Record<string, unknown>);
    trigger(): void;
}
export declare function createEvent(entity: Entity, rawData: Record<string, unknown>): SubEvent | SubEventSequence | SubEventTrigger | SubEventWeight | undefined;
export declare class EventManager {
    protected events: Map<string, IEvent>;
    constructor(entity: Entity, events: Record<string, unknown>);
    trigger(eventName: string): Promise<unknown[] | undefined> | undefined;
}
