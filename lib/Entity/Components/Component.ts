import { Entity } from "../main";
import { Tickable } from "../../World/main";

export abstract class EntityComponent implements Tickable {
    public abstract key: string;
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
    abstract tick(curr_tick: number): void;
}