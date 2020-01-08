import { IEventDefinition, EventDefintion } from "../EventDefinition";
import { Entity } from "../main";
import { weightedChoice } from "../../Utility/WeightedChoice";
import { EntityComponent, TickableComponent } from "./Component";

type WeightElement = { weight: number; value: number };
export interface ITimer {
    looping?: boolean;
    randomInterval?: boolean;
    random_time_choices: WeightElement[];
    time?: number[] | number;
    time_down_event?: IEventDefinition;
}

export class Timer extends TickableComponent {
    public readonly key = "minecraft:timer";
    private finish_tick = -1;
    constructor(entity: Entity, data: ITimer) { super(entity, data); }

    private get time(): number {
        if(this.data.random_time_choices === undefined) {
            if(this.data.time === undefined) return 0;

            if((this.data.randomInterval === undefined || this.data.randomInterval) && Array.isArray(this.data.time)) {
                return this.data.time[Math.floor(Math.random()*2)];
            } else {
                return (Array.isArray(this.data.time) ? this.data.time[0] : this.data.time);
            }
        } else {
            return weightedChoice<WeightElement>(this.data.random_time_choices).value;
        }
    }
    private onTimeDown() {
        new EventDefintion(this.data.time_down_event).eval(this.entity);

        this.deactivate();
        if(this.data.looping === undefined || this.data.looping) {
            this.activate();
        }
    }
    tick(curr_tick: number) {
        if(this.finish_tick === -1) {
            this.finish_tick = curr_tick + this.time * 20 + 1;
        }

        if(curr_tick > this.finish_tick) {
            this.onTimeDown();
        }
    }

    activate() {
        if(this.is_active) this.deactivate();

        this.is_active = true;
    }
    deactivate() {
        if(this.is_active) {
            this.is_active = false;
            this.finish_tick = -1;
        }
    }
}