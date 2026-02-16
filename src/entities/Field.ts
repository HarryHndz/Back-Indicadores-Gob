import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { Form } from "@/entities/Form";

@Entity()
export class Field{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:100})
  key!:string

  @Column({length:150})
  label!: string

  @Column({default: true})
  active!: boolean

  @Column({length:50})
  type!:string

  @Column({default: new Date()})
  createdAt!: Date

  @Column({type:'jsonb',nullable:true})
  validations!: Record<string, any>

  @Column({type:'jsonb',nullable:true})
  options!: Record<string, any>

  @Column({type:'int',nullable:true})
  order_index!:number

  @Column({ type: "varchar", nullable: true })
  depends_on_value!: string;

  @ManyToOne(() => Field, { nullable: true })
  @JoinColumn({ name: "id_depends_on_field" })
  dependsOnField!: Relation<Field>;
  
  @ManyToOne(() => Form, (form) => form.fields,{
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "id_form" })
  form!: Relation<Form>

}