import { Entity } from '../main';
import { AllOf } from './AllOf';
import { AnyOf } from './AnyOf';
import { NoneOf } from './NoneOf';
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
export declare function createFilter(entity: Entity, filterData: any): Filter | AllOf | AnyOf | NoneOf;
