import { promises as fs } from "fs";
import cJSON from "comment-json";

export async function readJSON(file_path: string) {
    return cJSON.parse((await fs.readFile(file_path)).toString("utf-8"), undefined, true);
}