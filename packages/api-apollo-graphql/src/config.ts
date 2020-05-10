import { Config as Base } from '@todo/db-marshall'

export class Config extends Base {
  port: number = Base.num(process.env.PORT) ?? 8080

  graphql_path = process.env.GRAPHQL_PATH ?? 'graphql'

  // eslint-disable-next-line @typescript-eslint/camelcase
  get local_uri() {
    return `http://localhost:${this.port}/${this.graphql_path}`
  }
}

export const config = new Config()
