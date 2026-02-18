import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,OneToMany, Relation } from "typeorm";
import { GuvernmentEntity,Field, Form } from "@/entities/index";


@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150,type:"varchar" })
  name!: string;

  @Column({ default: true,type:"boolean" })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Form, (form) => form.topic)
  @JoinColumn({ name: "id_form" })
  form!: Relation<Form>;

  @OneToMany(() => Field, (field) => field.topic)
  fields!: Relation<Field>[];

}
