# BPTest
Unit testing for Minecraft behavior packs

## Installation
```npm i bptest```

## Usage
```javascript
import { ENV, BPTest } from "bptest";

const PROJ = "path/to/project";

ENV.setup(PROJ, async () => {
    const W = new BPTest.World();
    const E = new BPTest.Entity(await BPTest.readJSON(path.join(PROJ, "entities/player.json")));
    W.add(E);
    W.tick();
})
```
