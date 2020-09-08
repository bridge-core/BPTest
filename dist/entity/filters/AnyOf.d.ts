import { Entity } from '../main';
import { Evaluable } from './main';
export declare class AnyOf implements Evaluable {
    protected filters: Evaluable[];
    constructor(entity: Entity, rawFilters: unknown[]);
    eval(): boolean;
}
