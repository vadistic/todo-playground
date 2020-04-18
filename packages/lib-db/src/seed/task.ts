import f from 'faker'

import type { TaskBase, ServiceBase } from '../interfaces'
import type { SeedResult } from './seed'
import { chance } from './utils'

export const fakeTask = (): TaskBase => {
  const createdAt = f.date.recent(f.random.number({ min: 1, max: 45 }))
  const now = new Date()

  const updatedAt = chance(
    30,
    () => f.date.between(createdAt, now),
    () => createdAt,
  )

  const content = chance(30, () => f.lorem.sentences(f.random.number(3)))

  return {
    id: f.random.uuid(),
    createdAt,
    updatedAt,
    name: f.hacker.phrase(),
    content,
    finished: f.random.boolean(),
  }
}

export const TASK_SEED_COUNT = 50

export const seedTask = async (service: ServiceBase) => {
  const p = Array.from({ length: TASK_SEED_COUNT })
    .map(fakeTask)
    .map(({ id, createdAt, updatedAt, ...rest }) => service.task.createOne({ data: rest }))

  return Promise.all(p)
}

export const unseedTask = async (service: ServiceBase, prev: SeedResult['task']) => {
  const p = prev.map(({ id }) => service.task.deleteOne({ where: { id } }))

  return Promise.all(p)
}
