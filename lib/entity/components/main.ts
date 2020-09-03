import { Tickable } from '../../types/tickable'
import { Entity } from '../main'
import { Variant } from './variant'
import { Health } from './health'

export interface Component extends Tickable {
	reset: () => void
}
interface ComponentClass {
	new (entity: Entity, componentData: ComponentData): Component
}
export type ComponentData = Record<string, unknown> | unknown[]

const componentLibrary = new Map<string, ComponentClass>([
	['minecraft:variant', Variant],
	['minecraft:mark_variant', Variant],
	['minecraft:skin_id', Variant],
	['minecraft:health', Health],
])

export function createComponent(
	entity: Entity,
	componentName: string,
	componentData: ComponentData
) {
	const componentClass = componentLibrary.get(componentName)
	if (componentClass) return new componentClass(entity, componentData)
}
