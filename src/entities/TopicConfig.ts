import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, Relation } from "typeorm";
import { Topic } from "@/entities/Topic";
import { Field } from "@/entities/Field";

@Entity()
export class TopicConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  required_override!: boolean;

  @Column({ default: true })
  visible!: boolean;

  @ManyToOne(() => Topic, (topic) => topic.fieldConfigs, {
    onDelete: "CASCADE",
  })
  
  @JoinColumn({ name: "id_topic" })
  topic!: Relation<Topic>;

  @ManyToOne(() => Field, {
    onDelete: "CASCADE",
  })

  @JoinColumn({ name: "id_field" })
  field!: Relation<Field>;
}
