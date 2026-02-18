import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation, CreateDateColumn } from "typeorm";
import { Form, Topic } from "@/entities/index";

@Entity()
export class Field{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:100,type:"varchar"})
  key!:string

  @Column({length:150,type:"varchar"})
  label!: string

  @Column({default: true,type:"boolean"})
  active!: boolean

  @Column({length:50,type:"varchar"})
  type!:string

  @Column({length:50,type:"varchar"})
  yearFiscal!:string

  @Column({length:50,type:"varchar"})
  update_period!:string

  @CreateDateColumn({default: new Date()})
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

  @ManyToOne(() => Topic, (topic) => topic.fields, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "id_topic" })
  topic!: Relation<Topic> | null;
}