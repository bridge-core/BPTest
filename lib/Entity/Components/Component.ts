import { Entity } from "../main";
import { Tickable } from "../../World/main";

export abstract class EntityComponent {
    public readonly abstract key: string;
    public requires_tick = false;
    protected is_active: boolean = false;
    constructor(protected entity: Entity, protected data: any) {}

    activate() {
        this.is_active = true;
    }
    deactivate() {
        this.is_active = false;
    }
    
    isActive() {
        return this.is_active;
    }
    getData() { return this.data; }
}

export abstract class TickableComponent extends EntityComponent implements Tickable {
    public readonly requires_tick = true;
    abstract tick(curr_tick: number): void;
}