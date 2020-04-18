import f from 'faker'

import { ServiceBase, TaskBase } from '../interfaces'
import { seedTask, unseedTask } from './task'

f.seed(1233)

export interface SeedResult {
  task: TaskBase[]
}

export const seedAll = async (service: ServiceBase): Promise<SeedResult> => {
  const task = await seedTask(service)

  return {
    task,
  }
}

export const unseedAll = async (service: ServiceBase, prev: SeedResult) => {
  const task = await unseedTask(service, prev.task)

  return {
    task,
  }
}
