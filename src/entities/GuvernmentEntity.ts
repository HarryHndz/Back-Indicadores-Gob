import { Entity,PrimaryGeneratedColumn,Column,OneToMany,Relation, JoinColumn, ManyToOne } from "typeorm";
import {User,Form,Topic} from "@/entities/index"

@Entity()
export class GuvernmentEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150,type:"varchar"})
  name!: string

  @Column({length:250,type:"varchar"})
  description!: string

  @Column({default: true,type:"boolean"})
  active!: boolean

  @Column({default: new Date(),type:"timestamp"})
  createdAt!: Date

  @Column({default: false,type:"boolean"})
  isHaveSubGubernment!: boolean

  @ManyToOne(() => GuvernmentEntity,{nullable:true})
  @JoinColumn({name:"id_parent_gubernment"})
  parentGubernment!: Relation<GuvernmentEntity>
  
  @OneToMany(() => User, (user) => user.guvernment)
  users!: Relation<User>[]

  @OneToMany(() => Form, (form) => form.guvernment)
  forms!: Relation<Form>[]    

}