import { IFilter } from "./Filter/Types";
import Filter from "./Filter/main";
import { weightedChoice } from "../Utility/WeightedChoice";
import { Entity } from "./main";

export interface IEvent {
    add?: { component_groups: string[]; };
    remove?: { component_groups: string[]; };
    sequence?: IEvent[];
    randomize?: IEvent[];
    weight?: number;
    filters?: IFilter;
}
export interface IFlatEvent {
    add: { component_groups: string[] };
    remove: { component_groups: string[] };
}

export class EntityEvent {
    constructor(private event: IEvent) {}

    private combine(res1: IFlatEvent, res2: IFlatEvent) {
        res1.add.component_groups.push(...res2.add.component_groups);
        res1.remove.component_groups.push(...res2.remove.component_groups);
    }

    trigger(entity: Entity): IFlatEvent { 
        let res: IFlatEvent = { add: { component_groups: [] }, remove: { component_groups: [] } };
        if(!new Filter(this.event.filters).eval(entity)) return res;


        if(this.event.add !== undefined && this.event.add.component_groups !== undefined)
            res.add.component_groups.push(...this.event.add.component_groups);
        if(this.event.remove !== undefined && this.event.remove.component_groups !== undefined)
            res.remove.component_groups.push(...this.event.remove.component_groups);

        if(this.event.sequence !== undefined)
            this.event.sequence.forEach(s => this.combine(res, new EntityEvent(s).trigger(entity)));
        if(this.event.randomize !== undefined)
            this.combine(res, new EntityEvent(weightedChoice(this.event.randomize)).trigger(entity));

        return res;
    }
}