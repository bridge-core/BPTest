import { Entity } from '../main';
export interface Evaluable {
    eval: () => boolean;
}
export declare abstract class Filter implements Evaluable {
    protected entity: Entity;
    protected value: string | number | boolean;
    protected operator: string;
    abstract readonly filterValue: string | number | boolean;
    constructor(entity: Entity, filterData: unknown);
    eval(): boolean;
}
