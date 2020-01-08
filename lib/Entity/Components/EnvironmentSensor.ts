import { EventDefinitionData, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { EntityComponent } from "./Component";

export interface EnvironmentSensorData {
    on_environment?: EventDefinitionData;
}

export class EnvironmentSensor extends EntityComponent {
    public key = "minecraft:environment_sensor";
    public requires_tick = true;
    constructor(entity: Entity, data: EnvironmentSensorData[] | EnvironmentSensorData) { super(entity, data); }

    tick() {
        if(Array.isArray(this.data)) {
            this.data.forEach(e => new EventDefintion(e.on_environment).eval(this.entity));
        } else {
            new EventDefintion(this.data.on_environment).eval(this.entity);
        }
    }
}