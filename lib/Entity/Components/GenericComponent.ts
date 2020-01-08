import { Entity } from "../main";
import { EntityComponent } from "./Component";

export default class GenericComponent extends EntityComponent {
    public key = "generic.component";
    constructor(entity: Entity, data: any) { super(entity, data); }

    activate() {
        this.is_active = true;
    }
    deactivate() {
        this.is_active = false;
    }

    tick() {}
}