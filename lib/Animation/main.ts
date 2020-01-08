import { Tickable } from "../World/main";
import { execCommand } from "../Commands/main";
import { Entity } from "../Entity/main";
import { ENV } from "../main";

export interface IAnimations {
    format_version?: string;
    animations: {
        [id: string]: IAnimation;
    }
}
export interface IAnimation {
    animation_length: number;
    loop: boolean;
    timeline: {
        [timestamp: string]: string[];
    }
}

export function runAnimEffects(effects: string[], entity: Entity) {
    effects.forEach(e => {
        if(e.startsWith("/")) execCommand(e);
        else if(e.startsWith("@s")) entity.trigger(e.replace("@s ", ""));
        else entity.interpreter.parse(e);
    });
}

export class Animation implements Tickable {
    //Functionality
    private is_running = false;
    private start_tick: number = -1;

    //JSON Format
    private animation_length: number; //Animation length in ticks
    private loop: boolean;
    private timeline = new Map<number, string[]>();

    constructor({ animation_length, loop, timeline }: IAnimation, private entity: Entity) {
        this.animation_length = animation_length * 20;
        this.loop = loop;
        this.timeline = new Map(Object.entries(timeline).map(([timestamp, effects]) => [Number(timestamp) * 20, effects]));
    }

    tick(curr_tick: number) {
        if(!this.is_running) return;

        if(this.start_tick === -1) this.start_tick = curr_tick; //Initial start of the animation

        let rel_tick = curr_tick - this.start_tick;
        this.triggerEffects(rel_tick);

        //Animation finished running
        if(this.animation_length <= rel_tick) {
            if(this.loop) this.start_tick = -1;
            else this.stop();
        }
    }

    triggerEffects(rel_tick: number) {
        this.timeline.forEach((effects, timestamp) => {
            if(timestamp <= rel_tick) 
                runAnimEffects(effects, this.entity);
        });
    }

    stop() {
        this.is_running = false;
        this.start_tick = -1;
    }
    start() {
        this.is_running = true;
    }
}

export class Animations implements Tickable {
    private animations = new Map<string, Animation>();

    constructor({ format_version, animations }: IAnimations, entity: Entity) {
        for(let id in animations) {
            this.animations.set(id, new Animation(animations[id], entity));
        }
    }


    get(id: string) {
        let anim = this.animations.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);
        
        return anim;
    }
    run(id: string) {
        let anim = this.animations.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);

        anim.start();
        return anim;
    }

    tick(curr_tick: number) {
        this.animations.forEach(anim => anim.tick(curr_tick))
    }

    stop(id: string) {
        let anim = this.animations.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);

        anim.stop();
        return anim;
    }
}