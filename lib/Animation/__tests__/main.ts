import { Animations } from "../main"
import { Entity } from "../../Entity/main"
import { World } from "../../World/main";
import { ENV } from "../../main";

test("Animation test", () => {
    const W = new World();
    const entity = new Entity({ "minecraft:entity": { description: {} } });

    const anims = new Animations({
        animations: {
            "animation.test": {
                "loop": false,
                "animation_length": 5,
                "timeline": {
                    "0.0": [
                        "/say Hi"
                    ],
                    "1.0": [
                        "/say 1 second passed"
                    ]
                }
            }
        }
    }, entity);
    W.add(anims);
    
    anims.run("animation.test");
    W.tick();
    expect(ENV.LOG.getLogs().includes(`Execute "/say Hi"`)).toBe(true);
    W.tick(20);
    expect(ENV.LOG.getLogs().includes(`Execute "/say 1 second passed"`)).toBe(true);
})