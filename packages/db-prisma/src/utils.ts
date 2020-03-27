import { Nullable } from '@todo/shared-db'

type StringMap<T = string> = {
  [key: string]: T
}

export const isObject = (val: any) => typeof val === 'object' && val !== null && !Array.isArray(val)

/** simple lazy implementation */
export const lazy = <P, R>(fn: (props: P) => R) => {
  let store: R

  return (props: P) => {
    if (store === undefined) store = fn(props)
    return store
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type Range = undefined | { lte: Date } | { gte: Date } | { lte: Date; gte: Date }

export const range = ({ from, to }: { from: Nullable<Date>; to: Nullable<Date> }): Range => {
  if (!from && !to) return undefined
  if (!from && to) return { lte: to }
  if (from && !to) return { gte: from }
  if (from && to) return { gte: from, lte: to }
}

// ────────────────────────────────────────────────────────────────────────────────

export type ValueConfig<A, C> = {
  [K in keyof C]: C[K] | undefined | { $value: C[K]; $keys: (keyof A)[] }
}

/** build map from args/aliased to value keys */
const builAliasMap = <A, V>(cfg: ValueConfig<A, V>) => {
  const aliasMap: StringMap = {}

  Object.entries<any>(cfg).forEach(([key, val]) => {
    if (isObject(val) && '$keys' in val)
      val.$keys.forEach((alias: string) => {
        aliasMap[alias] = key
      })
  })

  return aliasMap
}

/**
 * takes callback from args to value;
 * then filter from value those kays that are undefined in args;
 *
 * and to be more fun - support lazy computed many-to-one object key mappings
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
      const target = aliasMap[key] ?? key

      const isUndef = val === undefined
      const isCopied = res[target] !== undefined

      if (isUndef) return
      if (isCopied) return

      const isAliased = key in aliasMap
      const isNullified = isAliased
        ? (cfg[target].$keys as string[]).every(
            (alias) => args[alias as keyof A] === undefined || args[alias as keyof A] === null,
          )
        : val === null

      // nulls are meaningfull
      // use {equals} filter AND only if all mapped keys are null/undef
      if (isNullified) {
        res[target] = { equals: null }
        return
      }

      res[target] = isAliased ? cfg[target].$value : cfg[target]
    })

    return res
  }

  return handle
}
