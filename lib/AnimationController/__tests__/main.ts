import { AnimationControllers } from "../main"
import { Entity } from "../../Entity/main"
import { World } from "../../World/main";
import { ENV } from "../../main";

test("Animation test", () => {
    const W = new World();
    const entity = new Entity({ "minecraft:entity": { description: {} } }, {
        query: {
            get_count() {
                return "1.0";
            }
        }
    });

    const anims = new AnimationControllers({
        animation_controllers: {
            "controller.animation.test": {
                states: {
                    default: {
                        transitions: [{ second: "query.get_count" }],
                        on_entry: [ "/say Start" ],
                        on_exit: [ "/say Exit" ]
                    },
                    second: {
                        on_entry: [ "/say Second" ]
                    }
                }
            }
        }
    }, entity);
    W.add(anims);
    
    anims.run("controller.animation.test");
    W.tick();
    expect(ENV.LOG.getLogs().includes(`Execute "/say Start"`)).toBe(true);
    expect(ENV.LOG.getLogs().includes(`Execute "/say Exit"`)).toBe(true);
    
    expect(ENV.LOG.getLogs().includes(`Execute "/say Second"`)).toBe(false);
    W.tick();
    expect(ENV.LOG.getLogs().includes(`Execute "/say Second"`)).toBe(true);
});