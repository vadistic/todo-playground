import { IResolvers } from 'apollo-server-express'

import { Context } from './context'

export const resolvers: IResolvers = {
  Query: {
    task: async (_, args: any, ctx: Context) => {
      return ctx.service.task.findOne({ where: { id: args.id } })
    },
    tasks: async (_, args: any, ctx: Context) => {
      return ctx.service.task.findMany({ where: {} })
    },
  },
}
