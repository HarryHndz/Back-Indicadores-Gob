import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, Relation, CreateDateColumn } from "typeorm";
import { Rol, GuvernmentEntity } from "@/entities/index";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150,type:"varchar"})
  name!: string

  @Column({length:150,unique:true,type:"varchar"})
  email!: string

  @Column({length:150,type:"varchar"})
  password!: string

  @Column({default: true,type:"boolean"})
  active!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @ManyToOne(() => Rol)
  @JoinColumn({ name: "id_rol" })
  rol!: Relation<Rol>

  @ManyToOne(() => GuvernmentEntity,(guvernment) => guvernment.users)
  @JoinColumn({ name: "id_guvernment" })
  guvernment!: Relation<GuvernmentEntity>

}