# BPTest
Unit testing for Minecraft behavior packs

## Usage
```javascript
import { ENV, BPTest } from "bptest";

const PROJ = "C:\\Users\\bened\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Project Fable BP";

ENV.setup(PROJ, async () => {
    const W = new BPTest.World();
    const E = new BPTest.Entity(await BPTest.readJSON(path.join(PROJ, "entities/player.json")));
    W.add(E);
    W.tick();
})
```
