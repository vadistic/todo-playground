import dotenv from 'dotenv'

export type NodeEnv = 'test' | 'development' | 'production'

export interface ConfigLoadOptions {
  file: string
}

export class Config {
  node_env: NodeEnv = (process.env.NODE_ENV as NodeEnv) ?? 'development'

  debug: boolean = Config.bool(process.env.DEBUG) ?? false

  // ────────────────────────────────────────────────────────────────────────────────

  load({ file }: ConfigLoadOptions): this {
    const { parsed } = dotenv.config({ path: file })

    if (parsed) {
      // overwrite env, skip undefined
      for (const [key, val] of Object.entries(parsed)) {
        if (val !== undefined) process.env[key] = val
      }
    }

    const temp = new (this.constructor as any)()

    // overwrite instance - spread to remove methods
    Object.assign(this, { ...temp })

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  static bool(value: string | boolean | number | undefined): boolean | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'boolean') return value

    switch (('' + value).toLowerCase().trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true
      case 'false':
      case 'no':
      case '0':
      case null:
        return false
      default:
        return Boolean(value)
    }
  }

  static num(value: string | boolean | undefined): number | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'number') return value

    return +value
  }
}
