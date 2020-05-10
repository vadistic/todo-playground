import { Config as Base } from '@todo/lib-db'

export class Config extends Base {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  faunadb_secret: string = process.env.FAUNADB_SECRET!
}

export const config = new Config()
