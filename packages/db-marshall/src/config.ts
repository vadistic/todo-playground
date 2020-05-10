import { Config as Base } from '@todo/lib-db'

export class Config extends Base {
  mongodb_user?: string = process.env.MONGODB_USER

  mongodb_pass?: string = process.env.MONGODB_PASS

  mongodb_name: string = process.env.MONGODB_NAME || 'dev'

  mongodb_port: number = Base.num(process.env.MONGODB_port) ?? 21017

  mongodb_host: string = process.env.MONGODB_HOST || 'localhost'

  // eslint-disable-next-line @typescript-eslint/camelcase
  get mongodb_uri() {
    let uri = `mongodb://${this.mongodb_host}`

    if (config.mongodb_port !== 21017) {
      uri += `:${this.mongodb_port}`
    }

    if (config.mongodb_name) {
      uri += `/${this.mongodb_name}`
    }

    return uri
  }
}

export const config = new Config()
