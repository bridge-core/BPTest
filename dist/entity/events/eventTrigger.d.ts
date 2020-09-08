import { Entity } from '../main';
import { Evaluable } from '../filters/main';
import { Target } from '../targets';
export declare function ensureCorrectType(eventTriggerData: unknown): Record<string, unknown>;
export declare class EventTrigger {
    protected entity: Entity;
    filters?: Evaluable;
    eventName?: string;
    target?: Target;
    constructor(entity: Entity, eventTriggerData: unknown);
    trigger(): void;
}
