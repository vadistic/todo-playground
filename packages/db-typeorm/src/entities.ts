import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { TaskEntityBase, ID, Nullable } from 'shared-interfaces'

@Entity({ name: 'Task' })
export class TaskEntity implements TaskEntityBase {
  @PrimaryGeneratedColumn('increment')
  id!: ID

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  content: Nullable<string>
}
