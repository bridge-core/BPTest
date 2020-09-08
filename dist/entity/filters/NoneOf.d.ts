import { Entity } from '../main';
import type { Evaluable } from './_generic';
export declare class NoneOf implements Evaluable {
    protected filters: Evaluable[];
    constructor(entity: Entity, rawFilters: unknown[]);
    eval(): boolean;
}
