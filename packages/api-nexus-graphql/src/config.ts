import { Config as Base } from '@todo/db-marshall'

export class Config extends Base {
  port: number = Base.num(process.env.PORT) ?? 8080

  graphql_path = process.env.GRAPHQL_PATH ?? 'graphql'

  local_uri = `http://localhost:${this.port}/${this.graphql_path}`
}

export const config = new Config()
