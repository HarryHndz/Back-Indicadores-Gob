import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn, Relation } from "typeorm";
import { Form } from "@/entities/Form";
import { Topic } from "@/entities/Topic";
import { User } from "@/entities/User";

@Entity()
export class FormData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "jsonb" })
  data!: Record<string, any>;

  @Column({ default: false })
  edit!: boolean;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Form, (form) => form.formData)
  @JoinColumn({ name: "id_form" })
  form!: Relation<Form>;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: "id_topic" })
  topic!: Relation<Topic>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_user" })
  user!: Relation<User>;
}
