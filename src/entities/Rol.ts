import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({default: new Date()})
  createdAt!: Date

}