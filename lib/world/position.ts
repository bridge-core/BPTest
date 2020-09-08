export function inRange(a: number, b: number, r: number) {
	return b + r > a && b - r < a
}

export class Position {
	constructor(
		protected x: number,
		protected y: number,
		protected z: number
	) {}

	getX() {
		return this.x
	}
	getY() {
		return this.y
	}
	getZ() {
		return this.z
	}

	at(index: number | 'x' | 'y' | 'z') {
		if (typeof index === 'number') return this.asArray()[index]
		else return this.asObject()[index]
	}
	asArray() {
		return [this.x, this.y, this.z]
	}
	asObject() {
		return { x: this.x, y: this.y, z: this.z }
	}

	distanceTo(position: Position) {
		return Math.sqrt(
			Math.pow(this.x - position.getX(), 2) +
				Math.pow(this.y - position.getY(), 2) +
				Math.pow(this.z - position.getZ(), 2)
		)
	}
	isWithin(position: Position, radius: number) {
		return (
			inRange(this.x, position.getX(), radius) &&
			inRange(this.y, position.getY(), radius) &&
			inRange(this.z, position.getZ(), radius)
		)
	}
}
