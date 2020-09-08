import { Entity } from '../entity/main';
import { Position } from './position';
export interface WorldConfig {
    isExperimental: boolean;
}
export declare class World {
    protected entityPool: Set<Entity>;
    protected isExperimental: boolean;
    protected nextEntityId: number;
    protected entityCount: number;
    constructor({ isExperimental }: WorldConfig);
    getIsExperimental(): boolean;
    getEntityCount(): number;
    addEntity(entity: Entity): void;
    deleteEntity(entity: Entity): void;
    nearbyEntities(position: Position, radius: number): Entity[];
}
