import { Entity } from "../Entity/main";

export interface Tickable {
    tick: (curr_tick: number) => void;
}

export class World {
    tick_array: Tickable[] = [];
    curr_tick: number = 0;

    add(tickable: Tickable) {
        if(tickable instanceof Entity)
            tickable.setWorld(this);
            
        this.tick_array.push(tickable);
    }
    tick(n?: number) {
        if(n !== undefined) {
            for(let i = 0; i < n; i++)
                this.tick();
        } else {
            this.tick_array.forEach(tickable => tickable.tick(this.curr_tick));
            this.curr_tick++;
        }
    }
}