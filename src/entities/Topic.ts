import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,OneToMany, Relation } from "typeorm";
import { Field, Form } from "@/entities/index";


@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150,type:"varchar" })
  name!: string;

  @Column({ default: true,type:"boolean" })
  active!: boolean;

  @Column({length:50,type:"varchar",nullable:true})
  yearFiscal!:string | null

  @Column({length:50,type:"varchar",nullable:true})
  update_period!:string | null

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Form, (form) => form.topic)
  @JoinColumn({ name: "id_form" })
  form!: Relation<Form>;

  @OneToMany(() => Field, (field) => field.topic)
  fields!: Relation<Field>[];

}
