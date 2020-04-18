import f from 'faker'

export interface Chance {
  <R, F>(percent: number, fn: () => R, fallback: () => F): R | F
  <R>(percent: number, fn: () => R): R | undefined
}

export const chance: Chance = <R, F>(percent: number, fn: () => R, fallback?: () => F) => {
  const flag = percent >= f.random.number({ min: 0, max: 100 })

  if (flag) return fn()
  if (fallback) return fallback()

  return undefined
}
