/* eslint-disable no-param-reassign */
import { AllInputTypes, inputObjectType } from '@nexus/schema'

export const UniqueIDInput = inputObjectType({
  name: `UniqueIDInput`,
  definition(t) {
    t.id('id', { required: true })
  },
})

export const StringFilterInput = inputObjectType({
  name: `StringFilterInput`,
  definition(t) {
    t.field('eq', {
      type: 'String',
      required: false,
    })

    t.field('in', {
      type: 'String',
      required: false,
      list: true,
    })

    t.field('like', {
      type: 'String',
      required: false,
    })
  },
})

// ────────────────────────────────────────────────────────────────────────────────

export interface FilterOptions<T> {
  type: T
  default?: T
  required?: boolean
  list?: boolean | boolean[]
}

const inputCache = new Map<string, ReturnType<typeof inputObjectType>>()

const cachedInput = <T extends AllInputTypes>(
  nameFn: (options: FilterOptions<T>) => string,
  inputFn: (name: string, options: FilterOptions<T>) => ReturnType<typeof inputObjectType>,
) => (options: FilterOptions<T>) => {
  const name = nameFn(options)
  const cached = inputCache.get(name)

  if (cached) return cached

  const next = inputFn(name, options)

  inputCache.set(name, next)

  return next
}

// ────────────────────────────────────────────────────────────────────────────────

const eqFilterInputName = <T extends AllInputTypes>(options: FilterOptions<T>) =>
  [options.type, options.required && 'Required', options.list && 'List', 'Equal', 'Input']
    .filter(Boolean)
    .join('') as AllInputTypes

const setFilterInputName = <T extends AllInputTypes>(options: FilterOptions<T>) =>
  [options.type, options.required && 'Required', 'In', 'Input']
    .filter(Boolean)
    .join('') as AllInputTypes

const rangeFilterInputName = <T extends AllInputTypes>(options: FilterOptions<T>) =>
  [options.type, 'Range', 'Input'].filter(Boolean).join('') as AllInputTypes

// ────────────────────────────────────────────────────────────────────────────────

export const eqFilterInput = cachedInput(eqFilterInputName, (name, options) =>
  inputObjectType({
    name,
    definition(t) {
      t.field('eq', {
        type: options.type,
        required: options.required ?? true,
        list: options.list === true || undefined,
        default: options.default,
      })
    },
  }),
)

export const setFilterInput = cachedInput(setFilterInputName, (name, options) =>
  inputObjectType({
    name,
    definition(t) {
      t.field('in', {
        type: options.type,
        required: options.required ?? true,
        list: true,
        default: options.default,
      })
    },
  }),
)

export const rangeFilterInput = cachedInput(rangeFilterInputName, (name, options) =>
  inputObjectType({
    name,
    definition(t) {
      t.field('lte', {
        type: options.type,
        required: false,
      })

      t.field('gte', {
        type: options.type,
        required: false,
      })
    },
  }),
)

// ────────────────────────────────────────────────────────────────────────────────

export const resolveEqFilter = (res: any, key: string, prop: any) => {
  if (prop.eq !== undefined) {
    res[key] = prop.eq
  }
}

export const resolveSetFilter = (res: any, key: string, prop: any) => {
  if (prop.in !== undefined) {
    res[key] = prop.in
  }
}

export const resolveLikeFilter = (res: any, key: string, prop: any) => {
  if (prop.like !== undefined) {
    res[key] = prop.like
  }
}

export const resolveDateRangeFilter = (res: any, key: string, prop: any) => {
  if (prop.lte) {
    if (key === 'createdAt') {
      res.createdBefore = prop.lte
    }

    if (key === 'updatedAt') {
      res.updatedBefore = prop.lte
    }
  }

  if (prop.gte) {
    if (key === 'createdAt') {
      res.createdAfter = prop.gte
    }

    if (key === 'updatedAt') {
      res.updatedAfter = prop.gte
    }
  }
}

export const resolveFilterArgs = <R>(args: any): R => {
  const res: any = {}

  if (!args) return res

  for (const key of Object.keys(args)) {
    const prop = args[key]

    if (prop && typeof prop === 'object') {
      resolveEqFilter(res, key, prop)
      resolveSetFilter(res, key, prop)
      resolveLikeFilter(res, key, prop)
      resolveDateRangeFilter(res, key, prop)
    }
  }

  return res
}
