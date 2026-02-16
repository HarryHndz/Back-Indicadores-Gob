import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn } from "typeorm";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({type:"varchar",length:150})
  name!: string

  @CreateDateColumn({default: new Date()})
  createdAt!: Date

}