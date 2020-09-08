import { Entity } from '../main';
import { AllOf } from './AllOf';
import { AnyOf } from './AnyOf';
import { NoneOf } from './NoneOf';
import { Filter } from './_generic';
export declare function createFilter(entity: Entity, filterData: any): Filter | AllOf | AnyOf | NoneOf;
