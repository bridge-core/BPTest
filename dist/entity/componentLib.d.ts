import { Entity } from './main';
import { Component } from './components/_generic';
export declare type ComponentData = Record<string, unknown> | unknown[];
export declare function createComponent(entity: Entity, componentName: string, componentData: ComponentData): Component | undefined;
