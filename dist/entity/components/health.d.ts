import { Entity } from '../main';
import { ComponentData } from '../componentLib';
import { Component } from './_generic';
export declare class Health extends Component {
    protected entity: Entity;
    protected value: number;
    protected max: number;
    protected min: number;
    constructor(entity: Entity, componentData: ComponentData);
    getValue(): number;
    getMax(): number;
    getMin(): number;
    damage(amount: number): void;
    heal(amount: number): void;
}
