import { EventDefinitionData, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { EntityComponent } from "./Component";

export interface DamageSensorData {
    on_damage?: EventDefinitionData;
    deals_damage?: boolean;
    cause: string;
}

export class DamageSensor extends EntityComponent {
    public key = "minecraft:damage_sensor";
    public requires_tick = true;
    private registered_damage: boolean = false;
    constructor(entity: Entity, data: DamageSensorData[] | DamageSensorData) { super(entity, data); }

    tick() {
        if(!this.registered_damage) return;

        if(Array.isArray(this.data)) {
            this.data.forEach(e => new EventDefintion(e.on_damage).eval(this.entity));
        } else {
            new EventDefintion(this.data.on_damage).eval(this.entity);
        }
    }

    receiveDamage() {
        this.registered_damage = true;
    }
}