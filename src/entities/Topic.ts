import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,OneToMany, Relation } from "typeorm";
import { GuvernmentEntity } from "@/entities/GuvernmentEntity";
import { TopicConfig } from "@/entities/TopicConfig";


@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => GuvernmentEntity, (ge) => ge.topic)
  @JoinColumn({ name: "id_government_entity" })
  governmentEntity!: Relation<GuvernmentEntity>;

  @OneToMany(() => TopicConfig, (config) => config.topic)
  fieldConfigs!: Relation<TopicConfig>[];
}
