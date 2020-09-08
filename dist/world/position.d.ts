export declare function inRange(a: number, b: number, r: number): boolean;
export declare class Position {
    protected x: number;
    protected y: number;
    protected z: number;
    constructor(x: number, y: number, z: number);
    getX(): number;
    getY(): number;
    getZ(): number;
    at(index: number | 'x' | 'y' | 'z'): number;
    asArray(): number[];
    asObject(): {
        x: number;
        y: number;
        z: number;
    };
    distanceTo(position: Position): number;
    isWithin(position: Position, radius: number): boolean;
}
