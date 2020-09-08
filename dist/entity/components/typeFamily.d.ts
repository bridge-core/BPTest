import { Entity } from '../main';
import { ComponentData } from '../componentLib';
import { Component } from './_generic';
export declare class TypeFamily extends Component {
    protected entity: Entity;
    protected families: string[];
    constructor(entity: Entity, componentData: ComponentData);
    getFamilies(): string[];
}
