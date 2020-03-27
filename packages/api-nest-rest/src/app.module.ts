import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [CatsModule, MongooseModule.forRoot(`mongodb://localhost/api-nest-mongoose-rest`)],
})
export class AppModule {}
