import { DbBase, seedAll } from '@todo/lib-db'
import { Client, query as q, ClientConfig } from 'faunadb'

import { Collection } from './collections'
import { config } from './config'
import { Service } from './service'

export interface FaunaDb extends DbBase {
  client: Client
  service: Service
}

export const createDb = async (): Promise<FaunaDb> => {
  const opts: ClientConfig = {
    secret: config.faunadb_secret,
  }

  const client = new Client(opts)

  const service = new Service(client)

  const connect = async () => {
    // auto
  }

  const close = async () => {
    // auto
  }

  const sync = async () => {
    const p = Object.values(Collection).map(async (collection) => {
      const exists = await client.query(q.IsCollection(collection))

      if (!exists) {
        const name = (collection as any).raw.collection
        await client.query(q.CreateCollection({ name }))
      }
    })

    await Promise.all(p)
  }

  const drop = async () => {
    const p = Object.values(Collection).map(async (collection) => {
      const exists = await client.query(q.IsCollection(collection))

      if (exists) {
        await client.query(q.Delete(collection))
      }
    })

    await Promise.all(p)
  }

  const seed = async () => {
    await seedAll(service)
  }

  const isConnected = () => {
    // auto
    return true
  }

  return {
    client,
    service,
    connect,
    close,
    isConnected,
    sync,
    drop,
    seed,
  }
}
