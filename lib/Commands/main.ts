import { ENV } from "../main";

export function execCommand(command: string) {
    ENV.LOG.add(`Execute "${command}"`);
}