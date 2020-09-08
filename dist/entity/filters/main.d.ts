import { Entity } from '../main';
export declare class Filter {
    protected entity: Entity;
    constructor(entity: Entity, filterData: unknown);
    eval(): boolean;
}
