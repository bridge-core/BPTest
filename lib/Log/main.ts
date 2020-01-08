
export class Log {
    private logs: { type?: "error" | "warning"; text: string }[] = [];

    add(str: string) {
        this.logs.push({ text: str });
    }

    addError(str: string): never {
        this.logs.push({ type: "error", text: str });
        throw new Error(str);
    }

    addWarning(str: string) {
        this.logs.push({ type: "warning", text: str });
    }
}