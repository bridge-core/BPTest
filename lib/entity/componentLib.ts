import { Entity } from './main'
import { Variant } from './components/variant'
import { Health } from './components/health'
import { CanPowerJump } from './components/canPowerJump'
import { TypeFamily } from './components/typeFamily'
import { Timer } from './components/timer'
import { Component } from './components/_generic'

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
	['minecraft:timer', Timer],
])

export function createComponent(
	entity: Entity,
	componentName: string,
	componentData: ComponentData
) {
	const componentClass = componentLibrary.get(componentName)
	if (componentClass) return new componentClass(entity, componentData)
}
