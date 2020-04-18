import { AllInputTypes, inputObjectType } from '@nexus/schema'

export const UniqueIDInput = inputObjectType({
  name: `UniqueIDInput`,
  definition(t) {
    t.id('id', { required: true })
  },
})

export interface FilterFieldConfig<T> {
  required?: boolean
  default?: T
  list?: boolean | boolean[]
}

export const eqInputName = <T extends AllInputTypes>(type: T, cfg?: FilterFieldConfig<T>) =>
  [type, cfg?.required && 'Required', cfg?.list && 'List', 'EqualInput']
    .filter(Boolean)
    .join('') as AllInputTypes

// required by default!
const eqInputGen = <T extends AllInputTypes>(type: T, cfg?: FilterFieldConfig<T>) =>
  inputObjectType({
    name: eqInputName(type, cfg),
    definition(t) {
      t.field('eq', {
        ...cfg,
        type,
        required: cfg?.required ?? true,
        list: cfg?.list === true ? cfg.list : undefined,
      })
    },
  })

const scalarNames = ['DateTime', 'String', 'Int', 'Boolean', 'Float', 'ID']

export const scalarEqInputs = scalarNames.reduce((acc, type) => {
  const typedType = type as AllInputTypes

  const cfgs = [
    { list: false, required: false },
    { list: false, required: true },
    { list: true, required: false },
    { list: true, required: true },
  ]

  cfgs.forEach((cfg) => {
    acc[eqInputName(typedType, cfg)] = eqInputGen(typedType, cfg)
  })

  return acc
}, {} as any)

export const resolveEqFilterArgs = <R>(args: any): R => {
  const res: any = {}

  if (!args) return res

  for (const key of Object.keys(args)) {
    if (args[key] && typeof args[key] === 'object' && args[key].eq !== undefined) {
      res[key] = args[key].eq
    }
  }

  return res
}
