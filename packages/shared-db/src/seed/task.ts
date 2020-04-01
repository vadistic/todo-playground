import f from 'faker'
import { ModuleBase, TaskBase } from '../interfaces'

const SEED_SIZE = 50
const SEED_VALUE = 1233

f.seed(SEED_VALUE)

export const generateTask = (): TaskBase => {
  const createdAt = f.date.recent(f.random.number({ min: 1, max: 45 }))
  const now = new Date()

  // half were updated
  const updatedAt = f.random.boolean() ? f.date.between(createdAt, now) : createdAt

  return {
    id: f.random.uuid(),
    createdAt,
    updatedAt,
    name: f.hacker.phrase(),
    content: f.random.boolean() ? f.lorem.paragraphs(2) : undefined,
    finished: f.random.boolean(),
  }
}

export const generateTasks = (size = SEED_SIZE) => Array.from({ length: size }).map(generateTask)

export const seedTasks = async (ctx: ModuleBase) => {
  return Promise.all(
    generateTasks().map(({ id, createdAt, updatedAt, ...rest }) =>
      ctx.service.task.createOne({ data: rest }),
    ),
  )
}
