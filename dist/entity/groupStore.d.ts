import { Entity } from './main';
import { Component } from './components/_generic';
export declare class ComponentGroupManager {
    protected entity: Entity;
    protected componentGroups: Map<string, ComponentGroup>;
    constructor(entity: Entity);
    addComponentGroup(groupName: string): void;
    removeComponentGroup(groupName: string): void;
}
declare class ComponentGroup {
    protected entity: Entity;
    protected components: Map<string, Component>;
    constructor(entity: Entity);
    add(): void;
    remove(): void;
}
export {};
