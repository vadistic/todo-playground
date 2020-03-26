import { IResolvers } from 'apollo-server'
import { Context } from './context'

export const resolvers: IResolvers = {
  Query: {
    task: (_, args: any, ctx: Context) => ctx.services.task.findOne({ where: { id: args.id } }),
    tasks: (_, args: any, ctx: Context) => ctx.services.task.findMany({ where: {} }),
  },
}
