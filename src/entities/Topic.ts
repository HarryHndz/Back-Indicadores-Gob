import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,JoinColumn,OneToMany, Relation } from "typeorm";
import { GuvernmentEntity, TopicConfig } from "@/entities/index";


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

  @ManyToOne(() => GuvernmentEntity, (ge) => ge.topic)
  @JoinColumn({ name: "id_government_entity" })
  governmentEntity!: Relation<GuvernmentEntity>;

  @OneToMany(() => TopicConfig, (config) => config.topic)
  fieldConfigs!: Relation<TopicConfig>[];
}
