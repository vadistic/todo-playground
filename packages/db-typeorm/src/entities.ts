import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'
import { TaskEntityBase, ID, Nullable, DateTime } from '@todo/shared-db'

@Entity({ name: 'Task' })
export class TaskEntity extends BaseEntity implements TaskEntityBase {
  @PrimaryGeneratedColumn('increment')
  id!: ID

  @CreateDateColumn()
  createdAt!: DateTime

  @UpdateDateColumn()
  updatedAt!: DateTime

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  content: Nullable<string>

  @Column('boolean', { default: false })
  finished!: boolean
}
