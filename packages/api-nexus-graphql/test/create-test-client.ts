import type { ApolloError } from 'apollo-server-express'
import type { DocumentNode } from 'graphql'
import fetch from 'node-fetch'

import { createApi, Api, config } from '../src'

export type TestClientArgs<R, V = {}> = {
  query: string | DocumentNode
  variables?: V
}

export type TestClientResponse<R> = { data: R; errors: undefined | ApolloError[] }

export type TestClientExecute = <R = any, V = {}>(
  args: TestClientArgs<R, V>,
) => Promise<TestClientResponse<R>>

export type TestClient = {
  api: Api
  close: () => Promise<void>
  execute: TestClientExecute
}

export const createTestClient = async (): Promise<TestClient> => {
  const api = await createApi()

  const instance = api.app.listen(config.port)

  const execute = async <R, V>({ query, variables }: TestClientArgs<R, V>) => {
    const res = await fetch(config.local_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: variables ?? {} }),
    })

    const { data, errors } = await res.json()

    return res.ok ? { data, errors: undefined } : { data: (undefined as unknown) as R, errors }
  }

  const close = async () => {
    await new Promise((ok) => instance.close(ok))
    await api.close()
  }

  return { execute, close, api }
}
