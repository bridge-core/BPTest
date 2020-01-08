import MoLang from "molang";
import { Tickable, World } from "../World/main";
import { Animations, IAnimation, Animation } from "../Animation/main";
import { AnimLib } from "../Animation/lib";
import { ENV } from "../main";
import { IAnimationController, AnimationControllers, AnimationController } from "../AnimationController/main";
import { EntityEvent, IEvent, IFlatEvent } from "./Event";
import ComponentStore from "./ComponentStore";
import ComponentGroup from "./ComponentGroup";
import { IFlatFilter } from "./Filter/main";
import { Subject } from "./Filter/Types";
import ComponentLoader from "./Components/ComponentLoader";

export interface IEntity {
    "minecraft:entity": {
        description?: IDescription;
        events?: {
            [event: string]: IEvent;
        }
        component_groups?: {
            [event: string]: any;
        }
        components?: any;
    }
}
export interface IDescription {
    identifier?: string;
    runtime_identifier?: string;
    is_spawnable?: boolean;
    is_summonable?: boolean;
    is_experimental?: boolean;

    animations?: {
        [short: string]: string;
    }

    scripts?: {
        initialize: string[];
        animate: (string | { [id: string]: string })[];
    }
}

export class Entity implements Tickable {
    public interpreter: MoLang.Interpreter;
    public FLAGS = new Map<string, boolean>();
    public FILTERS = new Map<string, (f: IFlatFilter) => number | boolean>();
    public animations: Animations = new Animations({ animations: {} }, this);
    public animation_controllers: AnimationControllers = new AnimationControllers({ animation_controllers: {} }, this);
    public subjects = new Map<string, Entity>();

    private animate: [Animation | AnimationController, string | boolean][] = [];
    private component_groups = new Map<string, ComponentGroup>();
    private components = new ComponentStore();
    private events = new Map<string, EntityEvent>();
    private world?: World;

    constructor({ "minecraft:entity": { description={}, events={}, components={}, component_groups={} }={} }: IEntity, store: any = {}) {
        //INIT MOLANG INTERPRETER
        this.interpreter = new MoLang.Interpreter(store);

        //Load description
        const { animations={}, scripts: { initialize=[], animate=[] }={} } = description;

        //ANIMATIONS
        let anims: { [id: string]: IAnimation } = {};
        let anim_cs: { [id: string]: IAnimationController } = {};
        for(let [short, full] of Object.entries(animations)) {            
            if(full.startsWith("controller.animation.")) {
                let anim = AnimLib.getController(full);
                if(anim === undefined) return ENV.LOG.addError(`Unable to find animation controller "${full}".`);

                anim_cs[full] = anim;
                anim_cs[short] = anim;
            } else if(full.startsWith("animation.")) {
                let anim = AnimLib.getAnim(full);
                if(anim === undefined) return ENV.LOG.addError(`Unable to find animation "${full}".`);

                anims[full] = anim;
                anims[short] = anim;
            } else {
                return ENV.LOG.addError(`Invalid animation or animation controller name: "${full}".`);
            }
        }
        
        this.animations = new Animations({ animations: anims }, this);
        this.animation_controllers = new AnimationControllers({ animation_controllers: anim_cs }, this);

        //INITIALIZE STATEMENT
        initialize.forEach((i: string) => this.interpreter.parse(i));

        //RUN ANIMATIONS
        animate.forEach(anim_id => {
            if(typeof anim_id === "string") {
                if(anim_id.startsWith("animation.")) {
                    this.animate.push([this.animations.run(anim_id), true]);
                } else {
                    this.animate.push([this.animation_controllers.run(anim_id), true]);
                }
            } else {
                const [[id, condition]] = Object.entries(anim_id);

                if(id.startsWith("animation.")) {
                    this.animate.push([this.animations.get(id), condition]);
                } else {
                    this.animate.push([this.animation_controllers.get(id), condition]);
                }
            }
        });

        //INIT EVENTS
        for(let event_name in events)
            this.events.set(event_name, new EntityEvent(events[event_name]));

        for(let group_name in component_groups)
            this.component_groups.set(group_name, new ComponentGroup(this, component_groups[group_name]));
    
            ComponentLoader.load(this, components).forEach((component, key) => {
                this.components.add(key, component);
                component.activate();
            });
    }

    /**
     * Tick the entity
     * 
     * ### Update order
     * 1. Animations and animation controllers
     * 2. Components
     * 
     * @param curr_tick Current tick
     */
    tick(curr_tick: number) {
        this.animate.forEach(([anim, condition]) => {
            if(typeof condition === "string") {
                if(this.interpreter.parse(condition)) {
                    anim.start();
                } else {
                    anim.stop();
                }
            }
            
            anim.tick(curr_tick);
        });

        this.components.tick(curr_tick);
    }

    trigger(event: string) {
        ENV.LOG.add(`Triggered event "${event}"`);

        let e = this.events.get(event);
        let res: IFlatEvent = { add: { component_groups: [] }, remove: { component_groups: [] } };
        if(e !== undefined) res = e.trigger(this);

        res.remove.component_groups.forEach(c => {
            let g = this.component_groups.get(c);
            if(g !== undefined) g.deactivate();
        });
        res.add.component_groups.forEach(c => {
            let g = this.component_groups.get(c);
            if(g !== undefined) g.activate();
        });
    }

    getComponents() {
        return this.components;
    }
    getSubj(subj: Subject) {
        return this.subjects.get(subj);
    }

    setWorld(world: World) {
        this.world = world;
    }
}