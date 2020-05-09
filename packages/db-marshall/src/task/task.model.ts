/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, uuid, f } from '@marcj/marshal'
import { TaskBase } from '@todo/lib-db'

@Entity('Task')
export class TaskModel implements TaskBase {
  @(f.primary().uuid())
  id: string = uuid()

  @f
  createdAt: Date = new Date()

  @f
  updatedAt: Date = new Date()

  constructor(
    @f public name: string,
    @f.optional() content?: string,
    @f public finished: boolean = false,
  ) {}
}
