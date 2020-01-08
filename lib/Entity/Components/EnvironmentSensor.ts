import { IEventDefinition, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { EntityComponent, TickableComponent } from "./Component";

export interface IEnvironmentSensorData {
    triggers?: { on_environment: IEventDefinition } | { on_environment: IEventDefinition }[]
}

export class EnvironmentSensor extends TickableComponent {
    public readonly key = "minecraft:environment_sensor";
    constructor(entity: Entity, data: IEnvironmentSensorData) { super(entity, data); }

    tick() {
        const { triggers=[] } = this.data;

        if(Array.isArray(triggers)) {
            triggers.forEach(t => new EventDefintion(t.on_environment).eval(this.entity));
        } else {
            new EventDefintion(triggers.on_environment).eval(this.entity);
        }
    }
}