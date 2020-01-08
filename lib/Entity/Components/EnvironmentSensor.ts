import { EventDefinitionData, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { EntityComponent, TickableComponent } from "./Component";

export interface EnvironmentSensorData {
    on_environment?: EventDefinitionData;
}

export class EnvironmentSensor extends TickableComponent {
    public readonly key = "minecraft:environment_sensor";
    constructor(entity: Entity, data: EnvironmentSensorData[] | EnvironmentSensorData) { super(entity, data); }

    tick() {
        if(Array.isArray(this.data)) {
            this.data.forEach(e => new EventDefintion(e.on_environment).eval(this.entity));
        } else {
            new EventDefintion(this.data.on_environment).eval(this.entity);
        }
    }
}