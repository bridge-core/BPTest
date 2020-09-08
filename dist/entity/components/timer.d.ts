import { Entity } from '../main';
import { ComponentData } from '../componentLib';
import { TickableComponent } from './_generic';
import { EventTrigger } from '../events/eventTrigger';
export declare class Timer extends TickableComponent {
    protected entity: Entity;
    protected timeDownEvent: EventTrigger;
    protected time: number;
    protected looping: boolean;
    protected randomInterval: boolean;
    protected startTick: number;
    protected isActive: boolean;
    constructor(entity: Entity, componentData: ComponentData);
    reset(): void;
    tick(currentTick: number): void;
}
