import { PrismaClient } from '@prisma/client'
import { Nullable, ID } from './types'

export interface GetTaskArgs {
  id: ID
}

export interface GetTasksArgs {
  ids?: Nullable<ID[]>
}

export const taskService = (client: PrismaClient) => ({
  getTask: ({ id }: GetTaskArgs) => {
    return client.task.findOne({ where: { id } })
  },
  getTasks: ({ ids }: GetTasksArgs) => {
    return client.task.findMany({ where: { id: { in: ids } } })
  },
})

export const services = (client: PrismaClient) => ({
  task: taskService(client),
})
