import { Entity } from '../main';
export declare function createQueryEnv(entity: Entity): {
    'query.variant': () => number;
    'query.mark_variant': () => number;
    'query.skin_id': () => number;
    'query.health': () => number;
    'query.is_alive': () => boolean;
    'query.position': (index?: number | undefined) => number | {
        x: number;
        y: number;
        z: number;
    };
    'query.has_any_family': (...families: string[]) => boolean;
    'query.blocking': () => unknown;
    'query.can_climb': () => unknown;
    'query.can_fly': () => unknown;
    'query.can_power_jump': () => boolean;
    'query.can_swim': () => unknown;
    'query.can_walk': () => unknown;
    'query.is_on_fire': () => unknown;
    'query.is_onfire': () => unknown;
    'query.get_actor_info_id': () => unknown;
    'query.actor_count': () => number;
    'query.count': (value: unknown) => number;
    'query.combine_entities': (...entities: unknown[]) => unknown[];
    'query.get_nearby_entities': (radius: number, filterId?: string | undefined) => Entity[];
    'query.get_nearby_entities_except_self': (radius: number, filterId?: string | undefined) => Entity[];
};
