import { Entity } from './main';
export declare type Target = 'self' | 'target' | 'other' | 'player' | 'parent' | 'damager' | 'block';
export declare class TargetRegistry {
    protected entity: Entity;
    protected registry: Map<Target, Entity>;
    constructor(entity: Entity);
    set(target: Target, entity: Entity): void;
    get(target: Target): Entity | undefined;
}
