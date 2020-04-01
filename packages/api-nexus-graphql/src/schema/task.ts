import { objectType, inputObjectType, arg, AllInputTypes } from 'nexus'

interface FilterFieldConfig<T> {
  required?: boolean
  default?: T
  list?: true | boolean[]
}

const eqInputName = <T extends AllInputTypes>(type: T, cfg?: FilterFieldConfig<T>) =>
  [type, cfg?.required && 'Required', cfg?.list && 'List', 'EqualInput']
    .filter(Boolean)
    .join('') as AllInputTypes

// required by default!
const eqInput = <T extends AllInputTypes>(type: T, cfg?: FilterFieldConfig<T>) =>
  inputObjectType({
    name: eqInputName(type, cfg),
    definition(t) {
      t.field('eq', { ...cfg, required: cfg?.required ?? true, type })
    },
  })

const scalars = ['DateTime', 'String', 'Int', 'Boolean', 'Float', 'ID']

export const scalarEqInputs = scalars.flatMap((type) => [
  eqInput(type as any),
  eqInput(type as any, { list: true }),
  eqInput(type as any, { required: true }),
  eqInput(type as any, { list: true, required: true }),
])

// ────────────────────────────────────────────────────────────────────────────────

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
    t.field('id', { required: true, type: eqInputName('ID') })
  },
})

const taskWhereUniqueArg = arg({ type: taskWhereUniqueInput, required: true })

const taskWhereFilterInput = inputObjectType({
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
      resolve: async (_, args, ctx) => {
        return ctx.service.task.findOne({ where: { id: args.where.id.eq } })
      },
    })

    t.field('tasks', {
      type: Task,
      list: true,
      nullable: false,
      args: {
        where: taskWhereFilterArg,
      },
      resolve: async (_, args, ctx) => {
        return ctx.service.task.findMany({
          where: resolveFilterArgs(args.where),
        })
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

const resolveFilterArgs = <R>(args: any): R => {
  const res: any = {}

  for (const key of Object.keys(args)) {
    if (args[key] && typeof args[key] === 'object' && args[key].eq !== undefined) {
      res[key] = args[key].eq
    }
  }

  return res
}
