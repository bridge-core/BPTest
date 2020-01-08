import MoLang from "molang";
import { Tickable } from "../World/main";
import { Animations, IAnimation, Animation } from "../Animation/main";
import { AnimLib } from "../Animation/lib";
import { ENV } from "../main";
import { IAnimationController, AnimationControllers, AnimationController } from "../AnimationController/main";

export interface IEntity {
    description: IDescription;
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
    public animations: Animations = new Animations({ animations: {} }, this);
    public animation_controllers: AnimationControllers = new AnimationControllers({ animation_controllers: {} }, this);

    private animate: [Animation | AnimationController, string | boolean][] = [];

    constructor({ description={} }: IEntity, store: any = {}) {
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
                anims[full] = anim;
            } else {
                return ENV.LOG.addError(`Invalid animation or animation controller name: "${full}".`);
            }
        }
        
        this.animation_controllers = new AnimationControllers({ animation_controllers: anim_cs }, this);
        this.animations = new Animations({ animations: anims }, this);

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


    }

    trigger(event: string) {
        ENV.LOG.add(`Triggered event "${event}"`);
    }
}