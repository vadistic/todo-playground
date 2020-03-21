import path from 'path'
import { ConnectionOptions, Connection, createConnection } from 'typeorm'
import { TaskEntity } from './entities'
import { createServices } from './services'

export const entities = [TaskEntity]

export const DB_PATH = path.join(__dirname, '../temp/dev.db')

export const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: DB_PATH,
  entities,
  logging: true,
}

export interface DbTypeOrm {
  ctn: Connection
  services: ReturnType<typeof createServices>
}

export const createDb = async (): Promise<DbTypeOrm> => {
  const ctn = await createConnection(connectionOptions)
  const services = createServices(ctn)

  return {
    ctn,
    services,
  }
}
