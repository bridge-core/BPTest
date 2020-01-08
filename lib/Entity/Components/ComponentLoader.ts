import { Constructable } from "../../Utility/Constructable";
import { Timer } from "./Timer";
import { Entity } from "../main";
import GenericComponent from "./GenericComponent";
import { EntityComponent } from "./Component";
import { DamageSensor } from "./DamageSensor";
import { EnvironmentSensor } from "./EnvironmentSensor";

const COMPONENT_LOOKUP: { [key: string]: Constructable<EntityComponent> } = {
    "minecraft:timer": Timer,
    "minecraft:environment_sensor": EnvironmentSensor,
    "minecraft:damage_sensor": DamageSensor
};

export default class ComponentLoader {
    static load(entity: Entity, data: any): Map<string, EntityComponent> {
        let comps = new Map<string, EntityComponent>();

        for(let key in data) {
            if(COMPONENT_LOOKUP[key] !== undefined) {
                comps.set(key, new COMPONENT_LOOKUP[key](entity, data[key] || {}));
            } else {
                comps.set(key, new GenericComponent(entity, data[key]));
            }
        }

        return comps;
    }
}