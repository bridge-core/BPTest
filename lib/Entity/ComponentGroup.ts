import ComponentLoader from "./Components/ComponentLoader";
import { Entity } from "./main";
import { EntityComponent } from "./Components/Component";

interface ComponentGroupStructure {
    [key: string]: object;
}

export default class ComponentGroup {
    private is_active: boolean = false;
    private components = new Map<string, EntityComponent>();
    constructor(private entity: Entity, raw_components: ComponentGroupStructure) {
        this.components = ComponentLoader.load(entity, raw_components);
    }

    activate() {
        this.is_active = true;
        this.components.forEach((component, key) => {
            this.entity.getComponents().add(key, component);
            component.activate();
        });
    }
    deactivate() {
        this.is_active = false;

        this.components.forEach(component => {
            component.deactivate();
        });
    }
    isActive() {
        return this.is_active;
    }

    getComponents() {
        let data: any = {};

        for(let entry of this.components) {
            data[entry[0]] = entry[1].getData();
        }

        return data;
    }
}