import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { config } from './config'

async function main() {
  config.load({ file: './.env' })

  if (config.debug) {
    console.log('config')
    console.log({ ...config })
  }

  const app = await NestFactory.create(AppModule)

  await app.listen(config.port)

  console.log(`Application is running on: ${await app.getUrl()}`)
}

main()
