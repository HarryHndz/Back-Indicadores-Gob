import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany, Relation, CreateDateColumn } from "typeorm";
import { Field, FormData,GuvernmentEntity, Topic } from "@/entities/index"


@Entity()
export class Form{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150,type:"varchar"})
  name!: string

  @Column({length:250,type:"varchar"})
  description!: string

  @Column({default: true,type:"boolean"})
  active!: boolean

  @Column({length:50,type:"varchar",nullable:true})
  yearFiscal!:string | null

  @Column({length:50,type:"varchar",nullable:true})
  update_period!:string | null

  @CreateDateColumn({default: new Date()})
  createdAt!: Date

  @ManyToOne(() => GuvernmentEntity, (guvernment) => guvernment.forms)
  @JoinColumn({ name: "id_gubernment" })
  guvernment!: Relation<GuvernmentEntity>
  
  @OneToMany(() => Field, (field) => field.form)
  fields!: Relation<Field>[]

  @OneToMany(() => FormData, (formData) => formData.form)
  formData!: Relation<FormData>[]

  @OneToMany(() => Topic, (topic) => topic.form)
  topic!: Relation<Topic>[]
}