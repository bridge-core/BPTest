import { Entity } from '../main'
import { Variant } from '../components/variant'

export function createQueryEnv(entity: Entity) {
	return {
		'query.variant': () =>
			(entity.getActiveComponent('minecraft:variant') as Variant).value,
		'query.mark_variant': () =>
			(entity.getActiveComponent('minecraft:mark_variant') as Variant)
				.value,
		'query.skin_id': () =>
			(entity.getActiveComponent('minecraft:skin_id') as Variant).value,
	}
}
