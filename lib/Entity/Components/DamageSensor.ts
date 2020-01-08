import { IEventDefinition, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { EntityComponent, TickableComponent } from "./Component";

export interface IDamageTrigger {
    on_damage?: IEventDefinition;
    deals_damage?: boolean;
    cause: string;
}

export interface IDamageSensor {
    triggers?: IDamageTrigger | IDamageTrigger[];
    
}

export class DamageSensor extends TickableComponent {
    public readonly key = "minecraft:damage_sensor";
    private registered_damage = false;
    constructor(entity: Entity, data: IDamageSensor) { super(entity, data); }

    tick() {
        if(!this.registered_damage) return;

        const { triggers=[] } = this.data;

        if(Array.isArray(triggers)) {
            triggers.forEach(t => new EventDefintion(t.on_damage).eval(this.entity));
        } else {
            new EventDefintion(triggers.on_damage).eval(this.entity);
        }
    }

    receiveDamage() {
        this.registered_damage = true;
    }
}