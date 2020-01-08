import { EntityComponent } from "./Components/Component";

export default class ComponentStore {
    private components = new Map<string, EntityComponent>();
    private requires_tick = new Map<string, EntityComponent>();
    add(key: string, component: EntityComponent) {
        if(this.components.has(key)) {
            this.components.get(key)!.deactivate();
        }

        if(component.requires_tick) this.requires_tick.set(key, component);
        this.components.set(key, component);
    }
    get(key: string) {
        return this.components.get(key);
    }
    has(key: string) {
        return this.components.has(key);
    }
    remove(key: string) {
        this.components.delete(key);
        this.requires_tick.delete(key);
    }

    forEach(fn: (component: EntityComponent, key: string) => any) {
        return this.components.forEach(fn);
    }
    tick(curr_tick: number) {
        this.requires_tick.forEach(component => {
            if(component.isActive()) component.tick(curr_tick);
        });
    }
}