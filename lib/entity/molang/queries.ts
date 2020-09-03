import { Entity } from '../main'
import { Variant } from '../components/variant'
import { Health } from '../components/health'

export function createQueryEnv(entity: Entity) {
	return {
		//Entity Components
		'query.variant': () =>
			(entity.getActiveComponent(
				'minecraft:variant'
			) as Variant)?.getValue() ?? 0,
		'query.mark_variant': () =>
			(entity.getActiveComponent(
				'minecraft:mark_variant'
			) as Variant)?.getValue() ?? 0,
		'query.skin_id': () =>
			(entity.getActiveComponent(
				'minecraft:skin_id'
			) as Variant)?.getValue() ?? 0,
		'query.health': () =>
			(entity.getActiveComponent(
				'minecraft:health'
			) as Health)?.getValue() ?? 20,
		'query.position': (index?: number) =>
			index === undefined
				? {
						x: entity.position[0],
						y: entity.position[1],
						z: entity.position[2],
				  }
				: entity.position[index],

		//Entity Flags
		'query.can_climb': () => entity.flags.get('canClimb'),
		'query.can_fly': () => entity.flags.get('canFly'),
		'query.can_swim': () => entity.flags.get('canSwim'),
		'query.can_walk': () => entity.flags.get('canWalk'),
		'query.is_on_fire': () => entity.flags.get('isOnFire'),
		'query.is_onfire': () => entity.flags.get('isOnFire'),

		//Utils
		'query.count': (value: unknown) =>
			Array.isArray(value) ? value.length : 1,
		'query.combine_entities': (...entities: unknown[]) =>
			entities.flat(Infinity),
	}
}
