import { join } from 'path'
import { promises as fs } from 'fs'
import { World } from '../world/main'
import { Entity } from '../entity/main'

async function readJSON(filePath: string) {
	return JSON.parse(
		(await fs.readFile(filePath)).toString('utf-8').replace(/\/\/.+\n/g, '')
	)
}

const PROJ = '.\\lib\\__tests__\\Test BP'

test('player.json', async (done) => {
	const world = new World({ isExperimental: true })
	world.registerEntity(await readJSON(join(PROJ, 'entities/player.json')))
	const player = world.summon('minecraft:player') as Entity
	expect(player).toBeDefined()

	expect(player.getActiveComponents()).toContain('minecraft:type_family')

	world.tick()
	expect(player.getActiveComponents()).not.toContain('minecraft:timer')
	player.triggerEvent('minecraft:gain_bad_omen')
	expect(player.getActiveComponents()).toContain('minecraft:timer')
	world.tick(1)
	expect(player.getActiveComponents()).not.toContain('minecraft:timer')

	done()
})
