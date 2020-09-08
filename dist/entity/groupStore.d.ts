import { Entity } from './main';
import { Component } from './components/_generic';
import { ComponentData } from './componentLib';
export declare class ComponentGroupManager {
    protected entity: Entity;
    protected componentGroups: Map<string, ComponentGroup>;
    constructor(entity: Entity, componentGroups: Record<string, unknown>);
    createComponentGroup(groupName: string, components: Record<string, ComponentData>): ComponentGroup;
    addComponentGroup(groupName: string): void;
    removeComponentGroup(groupName: string): void;
}
declare class ComponentGroup {
    protected entity: Entity;
    protected components: Map<string, Component>;
    constructor(entity: Entity, rawComponents: Record<string, ComponentData>);
    add(): void;
    remove(): void;
}
export {};
