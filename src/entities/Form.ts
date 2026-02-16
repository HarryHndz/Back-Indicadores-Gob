import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany, Relation } from "typeorm";
import { GuvernmentEntity } from "@/entities/GuvernmentEntity";
import { Field } from "@/entities/Field";
import { FormData } from "@/entities/FormData";
@Entity()
export class Form{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150})
  name!: string

  @Column({default: true})
  active!: boolean

  @Column({default: new Date()})
  createdAt!: Date

  @ManyToOne(() => GuvernmentEntity, (guvernment) => guvernment.forms)
  @JoinColumn({ name: "id_gubernment" })
  guvernment!: Relation<GuvernmentEntity>
  
  @OneToMany(() => Field, (field) => field.form)
  fields!: Relation<Field>[]

  @OneToMany(() => FormData, (formData) => formData.form)
  formData!: Relation<FormData>[]
}