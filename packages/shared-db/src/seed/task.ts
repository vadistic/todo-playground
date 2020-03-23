import f from 'faker'
import { BackendBase, TaskCreateOneArgs } from '../interfaces'

export const seedTasks = (db: BackendBase) => {
  f.seed(1234)

  const generateTaskData = (): TaskCreateOneArgs['data'] => ({
    name: f.hacker.phrase(),
    content: f.random.boolean ? f.lorem.paragraphs(2) : undefined,
    finished: f.random.boolean(),
  })

  return Promise.all(
    Array.from({ length: 50 }).map(() => db.services.task.createOne({ data: generateTaskData() })),
  )
}
