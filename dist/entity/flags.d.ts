import { Entity } from './main';
export declare type FlagName = 'canClimb' | 'canFly' | 'canSwim' | 'canWalk' | 'isOnFire' | 'isBlocking' | 'identifier' | 'runtimeIdentifier' | 'isSpawnable' | 'isSummonable' | 'isExperimental' | 'numericalIdentifier';
export declare class EntityFlags {
    protected entity: Entity;
    protected registry: Map<FlagName, unknown>;
    constructor(entity: Entity);
    set(flagName: FlagName, value: unknown): void;
    get(flagName: FlagName): unknown;
}
