import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'

import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [CatsModule, MongooseModule.forRoot(`mongodb://localhost/api-nest-mongoose-rest`)],
})
export class AppModule {}
