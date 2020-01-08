import { Subject, IFilter } from "./Filter/Types";
import { Entity } from "./main";
import Filter from "./Filter/main";

export interface EventDefinitionData {
    event: string;
    filters?: IFilter;
    target?: Subject;
}

export class EventDefintion {
    constructor(private def: EventDefinitionData | undefined) {}

    private get valid_target() {
        if(this.def === undefined) return false;
        return this.def.target === undefined || this.def.target === "self";
    }

    eval(entity: Entity) {
        if(this.valid_target && new Filter(this.def!.filters).eval(entity))
            entity.trigger(this.def!.event);
    }
}