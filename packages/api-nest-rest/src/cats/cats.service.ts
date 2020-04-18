import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly CatModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.CatModel(createCatDto)
    return createdCat.save()
  }

  async findAll(): Promise<Cat[]> {
    return this.CatModel.find().exec()
  }
}
