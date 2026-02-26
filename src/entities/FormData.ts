import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn, Relation } from "typeorm";
import { Form, Topic, User } from "@/entities/index";

@Entity()
export class FormData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "jsonb" })
  data!: Record<string, any>;

  @Column({ default: false,type:"boolean" })
  edit!: boolean;

  @Column({ default: true,type:"boolean" })
  active!: boolean;

  @CreateDateColumn({default:new Date()})
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Form, (form) => form.formData)
  @JoinColumn({ name: "id_form" })
  form!: Relation<Form>;

  @ManyToOne(() => Topic,{nullable:true})
  @JoinColumn({ name: "id_topic" })
  topic!: Relation<Topic> | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user!: Relation<User>;
}
