import { ConnectionOptions, Connection, createConnection, Repository } from 'typeorm'
import { TaskEntity } from './schema'
import { createServices } from './services'
import { CONFIG } from './config'

export const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: CONFIG.DB_FILE,
  entities: [TaskEntity],
  logging: ['error'],
  synchronize: true,
}

export interface Repositories {
  task: Repository<TaskEntity>
}

export interface TypeormModule {
  ctn: Connection
  repos: Repositories
  services: ReturnType<typeof createServices>
}

export const createModule = async (): Promise<TypeormModule> => {
  const ctn = await createConnection(connectionOptions)
  const services = createServices(ctn)

  const repos = {
    task: ctn.getRepository(TaskEntity),
  }

  return {
    ctn,
    services,
    repos,
  }
}
