import { ComponentData } from '../componentLib'
import { trigger } from '../../utils/EventSystem'

export function extractNumber(
	componentData: unknown,
	key: string,
	defaultValue: number
) {
	if (typeof (componentData as any)[key] !== 'number') {
		trigger(
			'error',
			new Error(
				`Invalid type for property "${key}": Expected number, found ${typeof (componentData as any)[
					key
				]}`
			)
		)
		return defaultValue
	}

	return (componentData as any)[key] as number
}

export function extractBoolean(
	componentData: unknown,
	key: string,
	defaultValue: boolean
) {
	if (typeof (componentData as any)[key] !== 'boolean') {
		trigger(
			'error',
			new Error(
				`Invalid type for property "${key}": Expected boolean, found ${typeof (componentData as any)[
					key
				]}`
			)
		)
		return defaultValue
	}

	return (componentData as any)[key] as boolean
}

export function extractString(
	componentData: unknown,
	key: string,
	defaultValue: string
) {
	if (typeof (componentData as any)[key] !== 'string') {
		trigger(
			'error',
			new Error(
				`Invalid type for property "${key}": Expected string, found ${typeof (componentData as any)[
					key
				]}`
			)
		)
		return defaultValue
	}

	return (componentData as any)[key] as string
}
