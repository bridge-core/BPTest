import { Entity } from '../entity/main';
import { Position } from './position';
export interface WorldConfig {
    isExperimental: boolean;
}
export declare class World {
    protected entityPool: Set<Entity>;
    protected isExperimental: boolean;
    protected entityRegistry: Map<string, unknown>;
    protected nextEntityId: number;
    protected entityCount: number;
    protected currentTick: number;
    constructor({ isExperimental }: WorldConfig);
    tick(ticksToSimulate?: number): void;
    getIsExperimental(): boolean;
    getEntityCount(): number;
    addEntity(entity: Entity): void;
    deleteEntity(entity: Entity): void;
    nearbyEntities(position: Position, radius: number): Entity[];
    allEntities(): Entity[];
    registerEntity(entityData: any): void;
    summon(identifier: string): Entity | undefined;
}
