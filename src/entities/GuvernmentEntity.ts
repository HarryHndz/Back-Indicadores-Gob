import { Entity,PrimaryGeneratedColumn,Column,OneToMany,Relation } from "typeorm";
import {User} from "@/entities/User"
import {Form} from "@/entities/Form"
import {Topic} from "@/entities/Topic"

@Entity()
export class GuvernmentEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150})
  name!: string

  @Column({length:250})
  description!: string

  @Column({default: true})
  active!: boolean

  @Column({default: new Date()})
  createdAt!: Date

  @OneToMany(() => User, (user) => user.guvernment)
  users!: Relation<User>[]

  @OneToMany(() => Form, (form) => form.guvernment)
  forms!: Relation<Form>[]    

  @OneToMany(() => Topic, (topic) => topic.governmentEntity)
  topic!: Relation<Topic>[]
}