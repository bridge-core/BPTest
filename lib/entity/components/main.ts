import { Tickable } from '../../types/tickable'
import { Entity } from '../main'
import { Variant } from './variant'
import { Health } from './health'
import { CanPowerJump } from './canPowerJump'
import { TypeFamily } from './typeFamily'

export interface Component extends Tickable {
	reset: () => void
}
interface ComponentClass {
	new (entity: Entity, componentData: ComponentData): Component
}
export type ComponentData = Record<string, unknown> | unknown[]

const componentLibrary = new Map<string, ComponentClass>([
	['minecraft:can_power_jump', CanPowerJump],
	['minecraft:health', Health],
	['minecraft:mark_variant', Variant],
	['minecraft:skin_id', Variant],
	['minecraft:type_family', TypeFamily],
	['minecraft:variant', Variant],
])

export function createComponent(
	entity: Entity,
	componentName: string,
	componentData: ComponentData
) {
	const componentClass = componentLibrary.get(componentName)
	if (componentClass) return new componentClass(entity, componentData)
}
