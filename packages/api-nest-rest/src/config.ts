import { Config as Base } from '@todo/lib-db'

export class Config extends Base {
  port: number = Base.num(process.env.port) ?? 8080

  rest_path: string = process.env.REST_PATH ?? 'api'
}

export const config = new Config()
