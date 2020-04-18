import { Nullable } from '@todo/shared-db'

type StringMap<T = string> = {
  [key: string]: T
}

const isObject = (val: any) => typeof val === 'object' && val !== null && !Array.isArray(val)

/** simple lazy implementation */
const lazy = <P, R>(fn: (props: P) => R) => {
  let store: R

  return (props: P) => {
    if (store === undefined) store = fn(props)
    return store
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type Range = undefined | { lte: Date } | { gte: Date } | { lte: Date; gte: Date }

export const range = ({ from, to }: { from: Nullable<Date>; to: Nullable<Date> }): Range => {
  if (from && to) return { gte: from, lte: to }
  if (from) return { gte: from }
  if (to) return { lte: to }

  return undefined
}

// ────────────────────────────────────────────────────────────────────────────────

export type ValueConfig<A, C> = {
  [K in keyof C]: C[K] | undefined | { $value: C[K]; $keys: (keyof A)[] }
}

/** build map from args/aliased to value keys */
const builAliasMap = <A, V>(cfg: ValueConfig<A, V>) => {
  const aliasMap: StringMap<string[]> = {}

  Object.entries<any>(cfg).forEach(([key, val]) => {
    if (isObject(val) && '$keys' in val)
      val.$keys.forEach((alias: string) => {
        if (!aliasMap[alias]) aliasMap[alias] = []

        aliasMap[alias].push(key)
      })
  })

  return aliasMap
}

/**
 * takes callback from args to value;
 * then filter from value those kays that are undefined in args
 *
 * and to be more fun - support lazy computed many-to-many object key mappings
 */
export const buildFilter = <A, V>(cfgFn: (args: A) => ValueConfig<A, V>) => {
  const getMap = lazy(builAliasMap)

  const handle = (args: A | undefined): V => {
    // allow undefined
    if (!args) {
      return {} as V
    }

    const cfg: any = cfgFn(args)
    const res: any = {}

    const aliasMap = getMap(cfg)

    Object.entries(args).forEach(([key, val]) => {
      const targets = aliasMap[key] ?? [key]

      const isUndef = val === undefined
      const isAliased = key in aliasMap

      // skip keys with undef value (but handle null)
      if (isUndef) return

      // easy mode
      if (!isAliased) {
        // is nullified both if arg val is null or cfg fn returned null
        res[key] = val === null || cfg[key] === null ? { equals: null } : cfg[key]
        return
      }

      // means all arg values poiting to this config value are null or undefined
      const isNullified = targets.every((target) =>
        (cfg[target].$keys as string[]).every(
          (alias) => args[alias as keyof A] === undefined || args[alias as keyof A] === null,
        ),
      )

      // nulls are meaningfull for filters
      // use {equals} filter
      if (isNullified) {
        targets.forEach((target) => {
          // also is nullified both if arg val is null or aliased cfg fn returned null
          if (val === null || cfg[target].$value === null) {
            res[target] = { equals: null }
          }
        })
        return
      }

      targets.forEach((target) => {
        if (val !== undefined) {
          res[target] = cfg[target].$value
        }
      })
    })

    return res
  }

  return handle
}
