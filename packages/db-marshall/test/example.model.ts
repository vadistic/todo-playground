/* eslint-disable @typescript-eslint/no-inferrable-types */
import { f, plainToClass, uuid, Entity } from '@marcj/marshal'

@Entity('SubModel')
class SubModel {
  @f
  label!: string
}

export enum Plan {
  DEFAULT,
  PRO,
  ENTERPRISE,
}

@Entity('SimpleModel')
export class SimpleModel {
  @(f.primary().uuid())
  id: string = uuid()

  @f.array(String)
  tags: string[] = []

  @f.optional() // binary
  picture?: ArrayBuffer

  @f
  type: number = 0

  @f.enum(Plan, /* allowLabelsAsValue= */ true)
  plan: Plan = Plan.DEFAULT

  @f
  created: Date = new Date()

  @f.array(SubModel)
  children: SubModel[] = []

  @f.map(SubModel)
  childrenMap: { [key: string]: SubModel } = {}

  constructor(
    @(f.index().asName('name')) // asName is required for minimized code
    public name: string,
  ) {}
}

export const simpleModelExample = plainToClass(SimpleModel, {
  name: 'myName',
  tags: ['foo', 'bar'],
  plan: 'PRO',
  created: 'Sat Oct 13 2018 14:17:35 GMT+0200',
  children: [{ label: 'foo' }],
  childrenMap: { foo: { label: 'foo' } },
})
