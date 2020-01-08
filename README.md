# BPTest
Unit testing for Minecraft behavior packs

## Installation
```npm i bptest```

## Usage
```javascript
import { ENV } from "bptest";

const PROJ = "path/to/project";

ENV.setup(PROJ, async ({ readJSON, World, Entity }) => {
    const W = new World();
    const E = new Entity(await readJSON(path.join(PROJ, "entities/player.json")));
    W.add(E);
    W.tick(200);
})
```
