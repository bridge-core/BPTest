import { Entity } from '../main'
import { Variant } from '../components/variant'
import { Health } from '../components/health'
import { TypeFamily } from '../components/typeFamily'

export function createQueryEnv(entity: Entity) {
	//Helper function for accessing components
	const c = (name: string) => entity.getActiveComponent(name)

	return {
		//Entity Components
		'query.variant': () =>
			(c('minecraft:variant') as Variant)?.getValue() ?? 0,
		'query.mark_variant': () =>
			(c('minecraft:mark_variant') as Variant)?.getValue() ?? 0,
		'query.skin_id': () =>
			(c('minecraft:skin_id') as Variant)?.getValue() ?? 0,
		'query.health': () =>
			(c('minecraft:health') as Health)?.getValue() ?? 20,
		'query.is_alive': () =>
			((c('minecraft:health') as Health)?.getValue() ?? 20) > 0,
		'query.position': (index?: number) =>
			index === undefined
				? entity.position.asObject()
				: entity.position.at(index),
		'query.has_any_family': (...families: string[]) =>
			(
				(c('minecraft:type_family') as TypeFamily)?.getFamilies() ?? []
			).some((family) => families.includes(family)),

		//Entity Flags
		'query.blocking': () => entity.flags.get('isBlocking'),
		'query.can_climb': () => entity.flags.get('canClimb'),
		'query.can_fly': () => entity.flags.get('canFly'),
		'query.can_power_jump': () =>
			c('minecraft:can_power_jump') !== undefined,
		'query.can_swim': () => entity.flags.get('canSwim'),
		'query.can_walk': () => entity.flags.get('canWalk'),
		'query.is_on_fire': () => entity.flags.get('isOnFire'),
		'query.is_onfire': () => entity.flags.get('isOnFire'),
		'query.get_actor_info_id': () =>
			entity.flags.get('numericalIdentifier'),

		//Utils
		'query.actor_count': () => entity.getWorld().getEntityCount(),
		'query.count': (value: unknown) =>
			Array.isArray(value) ? value.length : 1,
		'query.combine_entities': (...entities: unknown[]) =>
			entities.flat(Infinity),
		'query.get_nearby_entities': (radius: number, filterId?: string) =>
			entity
				.getWorld()
				.nearbyEntities(entity.position, radius)
				.filter(
					(currentEntity) =>
						currentEntity.flags.get('identifier') === filterId
				),
		'query.get_nearby_entities_except_self': (
			radius: number,
			filterId?: string
		) =>
			entity
				.getWorld()
				.nearbyEntities(entity.position, radius)
				.filter(
					(currentEntity) =>
						currentEntity !== entity &&
						(!filterId ||
							currentEntity.flags.get('identifier') === filterId)
				),
	}
}
