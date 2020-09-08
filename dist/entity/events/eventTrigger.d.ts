import { Entity } from '../main';
import type { Evaluable } from '../filters/_generic';
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
