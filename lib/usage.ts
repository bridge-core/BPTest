import { ENV } from "./main";
import { World } from "./World/main";
import { Entity } from "./Entity/main";
import { readJSON } from "./FS/main";
import path from "path";

const PROJ = "C:\\Users\\bened\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Project Fable BP";

ENV.setup(PROJ, async () => {
    const W = new World();
    const E = new Entity(await readJSON(path.join(PROJ, "entities/player.json")));
    W.add(E);
    W.tick();

    //expect(E.getComponentGroups()).toInclude("fable:initial_state")
})