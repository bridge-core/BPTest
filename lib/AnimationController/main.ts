import { Tickable } from "../World/main";
import { execCommand } from "../Commands/main";
import { Entity } from "../Entity/main";
import { ENV } from "../main";
import { Animation, runAnimEffects } from "../Animation/main";

export interface IAnimationControllers {
    format_version?: string;
    animation_controllers: {
        [id: string]: IAnimationController;
    }
}
export interface IAnimationController {
    initial_state?: string;
    states: {
        [id: string]: IState;
    }
}
export interface IState {
    animations?: (string | { [a: string]: string })[];
    transitions?:  { [t: string]: string }[];
    on_entry?: string[];
    on_exit?: string[];
}

class State implements Tickable {
    private animations = new Map<string, [Animation, string | boolean]>();
    private transitions: [string, string][];
    private on_entry: string[];
    private on_exit: string[];

    constructor({ animations, transitions, on_entry, on_exit }: IState, private animation_controller: AnimationController, private entity: Entity) {
        this.on_entry = on_entry || [];
        this.on_exit = on_exit || [];
        this.transitions = transitions?.map(t => Object.entries(t)[0]) || [];

        if(animations) {
            animations.forEach(anim_id => {
                if(typeof anim_id === "string") {
                    this.animations.set(anim_id, [entity.animations.run(anim_id), true]);
                } else {
                    const [[id, condition]] = Object.entries(anim_id);
                    let anim = entity.animations.get(id);
                    if(anim !== undefined)
                        this.animations.set(id, [anim, condition]);
                }
            });
        }
    }

    enter() {
        runAnimEffects(this.on_entry, this.entity);
    }

    exit() {
        runAnimEffects(this.on_exit, this.entity);
        this.animations.forEach(([anim]) => anim.stop());
    }

    tick(curr_tick: number) {
        for(let [state, condition] of this.transitions) {
            if(this.entity.interpreter.parse(condition))
                return this.animation_controller.transition(state);
        }

        this.animations.forEach(([anim, condition]) => {
            if(typeof condition === "string") {
                if(this.entity.interpreter.parse(condition)) {
                    anim.start();
                } else {
                    anim.stop();
                }
            }
            
            anim.tick(curr_tick);
        });
    }
}

export class AnimationController implements Tickable {
    //Functionality
    public is_running = false;
    private curr_state: State = new State({}, this, this.entity);

    //JSON Format
    private initial_state: string;
    private states = new Map<string, State>();

    constructor({ initial_state, states }: IAnimationController, private entity: Entity, id: string) {
        this.initial_state = initial_state || "default";
        this.states = new Map(Object.entries(states).map(([id, state]) => [id, new State(state, this, entity)]));

        let potential = this.states.get(this.initial_state);
        if(potential === undefined)
            return ENV.LOG.addError(`No default state for animation controller "${id}".`);
        this.curr_state = potential;
        this.curr_state.enter();
    }

    transition(id: string) {
        let potential = this.states.get(id);
        if(potential !== undefined) {
            this.curr_state.exit();
            this.curr_state = potential;
            this.curr_state.enter();
        } else {
            return ENV.LOG.addError(`Unknown controller state: "${id}"`);
        }
    }

    tick(curr_tick: number) {
        if(!this.is_running) return;

        this.curr_state.tick(curr_tick);
    }

    start() {
        this.is_running = true;
    }
    stop() {
        this.is_running = false;
    }
}

export class AnimationControllers implements Tickable {
    private animation_controllers = new Map<string, AnimationController>();

    constructor({ format_version, animation_controllers }: IAnimationControllers, entity: Entity) {
        for(let id in animation_controllers) {
            this.animation_controllers.set(id, new AnimationController(animation_controllers[id], entity, id));
        }
    }

    get(id: string) {
        let anim = this.animation_controllers.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);
        
        return anim;
    }

    run(id: string) {
        let anim = this.animation_controllers.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);

        anim.start();
        return anim;
    }

    tick(curr_tick: number) {
        this.animation_controllers.forEach(anim => anim.tick(curr_tick))
    }

    stop(id: string) {
        let anim = this.animation_controllers.get(id);
        if(anim === undefined) return ENV.LOG.addError(`Unknown animation: "${id}"`);

        anim.stop();
        return anim;
    }
}