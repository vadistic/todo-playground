import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType, intArg } from 'nexus'

const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.content()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('task', {
      type: Task,
      nullable: true,
      args: {
        id: intArg({ nullable: false }),
      },
      resolve: (_, args, ctx) => {
        return ctx.db.services.task.findOne({ where: { id: args.id } })
      },
    })

    t.field('tasks', {
      type: Task,
      list: true,
      nullable: false,
      args: {
        ids: intArg({ nullable: true, list: true }),
      },
      resolve: (_, args, ctx) => {
        return ctx.db.services.task.findMany({ where: { ids: args.ids } })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('noop', {
      type: 'Boolean',
      resolve: () => {
        return true
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Task],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
