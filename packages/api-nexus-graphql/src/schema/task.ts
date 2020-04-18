import { objectType, inputObjectType, arg } from '@nexus/schema'
import { TaskCreateData, TaskUpdateData } from '@todo/shared-db'

import { eqInputName, UniqueIDInput, resolveEqFilterArgs } from './input'

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

export const TaskCreateInput = inputObjectType({
  name: 'TaskCreateInput',
  definition(t) {
    t.string('name', { required: true })
    t.string('content')
    t.boolean('finished')
  },
})

export const TaskUpdateInput = inputObjectType({
  name: 'TaskUpdateInput',
  definition(t) {
    t.string('name')
    t.string('content')
    t.boolean('finished')
  },
})

export const TaskWhereFilterInput = inputObjectType({
  name: `TaskWhereFilterInput`,
  definition(t) {
    t.field('ids', { type: eqInputName('ID', { list: true }) })

    t.field('updatedBefore', { type: eqInputName('DateTime') })
    t.field('updatedAfter', { type: eqInputName('DateTime') })
    t.field('createdBefore', { type: eqInputName('DateTime') })
    t.field('createdAfter', { type: eqInputName('DateTime') })

    t.field('name', { type: eqInputName('String') })
    t.field('content', { type: eqInputName('String', { required: false }) })
    t.field('finished', { type: eqInputName('Boolean') })
  },
})

const TaskWhereUniqueArg = arg({ type: UniqueIDInput, required: true })
const TaskWhereFilterArg = arg({ type: TaskWhereFilterInput, required: false })
const TaskCreateDataArg = arg({ type: TaskCreateInput, required: true })
const TaskUpdateDataArg = arg({ type: TaskUpdateInput, required: true })

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('task', {
      type: Task,
      nullable: true,
      args: {
        where: TaskWhereUniqueArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.findOne({ where: args.where })
      },
    })

    t.field('tasks', {
      type: Task,
      list: true,
      nullable: false,
      args: {
        where: TaskWhereFilterArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.findMany({
          where: resolveEqFilterArgs(args.where),
        })
      },
    })
  },
})

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createTask', {
      type: Task,
      args: {
        data: TaskCreateDataArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.createOne({ data: args.data as TaskCreateData })
      },
    })

    t.field('updateTask', {
      type: Task,
      args: {
        where: TaskWhereUniqueArg,
        data: TaskUpdateDataArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.updateOne({ where: args.where, data: args.data as TaskUpdateData })
      },
    })

    t.field('deleteTask', {
      type: Task,
      args: {
        where: TaskWhereUniqueArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.deleteOne({ where: args.where })
      },
    })
  },
})
