import { promises as fs } from "fs";
import path from "path";
import { IAnimation } from "./main";
import { readJSON } from "../FS/main";
import { IAnimationController } from "../AnimationController/main";
import { ENV } from "../main";

export class AnimLib {
    private static lib = new Map<string, IAnimation>();
    private static c_lib = new Map<string, IAnimationController>();

    static getController(id: string) {
        return this.c_lib.get(id);
    }
    static getAnim(id: string) {
        return this.lib.get(id);
    }

    static async loadAll(proj_path: string) {
        await Promise.all([
            this.loadDir(path.join(proj_path, "animations")),
            this.loadDir(path.join(proj_path, "animation_controllers"))
        ]);
    }
    private static async loadDir(file_path: string) {
        await Promise.all(
            (await fs.readdir(file_path, { withFileTypes: true })).map(
                async dirent => {
                    if(dirent.isFile()) {
                        let { animations, animation_controllers } = await readJSON(path.join(file_path, dirent.name));

                        if(animations) {
                            for(let id in animations)
                                this.lib.set(id, animations[id]);
                        } else if(animation_controllers) {
                            for(let id in animation_controllers) 
                                this.c_lib.set(id, animation_controllers[id]);
                        } else {
                            ENV.LOG.addError(`Invalid animation or animation controller: ${path.join(file_path, dirent.name)}`);
                        }
                    }
                    else {
                        await this.loadDir(path.join(file_path, dirent.name));
                    }
                }
            )
        );
    }
}