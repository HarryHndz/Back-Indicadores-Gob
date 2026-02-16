import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, Relation } from "typeorm";
import { Topic, Field } from "@/entities/index";

@Entity()
export class TopicConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true,type:"boolean" })
  required_override!: boolean;

  @Column({ default: true,type:"boolean" })
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
