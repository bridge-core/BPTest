import { Entity } from '../main';
import { ComponentData } from '../componentLib';
import { Component } from './_generic';
export declare class Variant extends Component {
    protected value: number;
    constructor(entity: Entity, componentData: ComponentData);
    getValue(): number;
}
