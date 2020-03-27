import { objectType, inputObjectType, arg } from 'nexus'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.content()
    t.model.finished()
  },
})

const taskWhereUniqueInput = inputObjectType({
  name: `TaskWhereUniqueInput`,
  definition(t) {
    t.id('id', { required: true })
  },
})

const taskWhereUniqueArg = arg({ type: taskWhereUniqueInput, required: true })

const taskWhereFilterInput = inputObjectType({
  name: `TaskWhereFilterInput`,
  definition(t) {
    t.id('ids')

    t.date('updatedBefore')
    t.date('updatedAfter')
    t.date('createdBefore')
    t.date('createdAfter')

    t.string('name')
    t.string('content')
    t.boolean('finished')
  },
})

const taskWhereFilterArg = arg({ type: taskWhereFilterInput, required: false })

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('task', {
      type: Task,
      nullable: true,
      args: {
        where: taskWhereUniqueArg,
      },
      resolve: (_, args, ctx) => {
        return ctx.service.task.findOne({ where: { id: args.where?.id } })
      },
    })

    t.field('tasks', {
      type: Task,
      list: true,
      nullable: false,
      args: {
        where: taskWhereFilterArg,
      },
      resolve: (_, args, ctx) => {
        return ctx.service.task.findMany({ where: args.where ?? undefined })
      },
    })
  },
})

export const Mutation = objectType({
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
