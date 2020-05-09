import {
  TaskBase,
  TaskCreateOneArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  TaskFindOneArgs,
} from '@todo/lib-db'
import { IResolvers } from 'apollo-server-express'

import { Context } from './context'
import { resolveFilter } from './filter'
import { TaskFindManyArgs } from './types'

export const resolvers: IResolvers = {
  Query: {
    task: async (_, { where }: TaskFindOneArgs, ctx: Context): Promise<TaskBase | null> => {
      return ctx.service.task.findOne({ where })
    },
    tasks: async (_, { where, ...rest }: TaskFindManyArgs, ctx: Context): Promise<TaskBase[]> => {
      return ctx.service.task.findMany({ where: where ? resolveFilter(where) : undefined, ...rest })
    },
  },
  Mutation: {
    createTask: async (_, { data }: TaskCreateOneArgs, ctx: Context): Promise<TaskBase> => {
      return ctx.service.task.createOne({ data })
    },
    updateTask: async (_, { where, data }: TaskUpdateOneArgs, ctx: Context): Promise<TaskBase> => {
      return ctx.service.task.updateOne({ where, data })
    },
    deleteTask: async (_, { where }: TaskDeleteOneArgs, ctx: Context): Promise<TaskBase> => {
      return ctx.service.task.deleteOne({ where })
    },
  },
}
