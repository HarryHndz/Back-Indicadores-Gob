import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn, Relation } from "typeorm";
import { Rol } from "@/entities/Rol";
import { GuvernmentEntity } from "@/entities/GuvernmentEntity";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number

  @Column({length:150})
  name!: string

  @Column({length:150,unique:true})
  email!: string

  @Column({length:150})
  password!: string

  @Column({default: true})
  active!: boolean

  @Column({default: new Date()})
  createdAt!: Date

  @ManyToOne(() => Rol)
  @JoinColumn({ name: "id_rol" })
  rol!: Relation<Rol>

  @ManyToOne(() => GuvernmentEntity,(guvernment) => guvernment.users)
  @JoinColumn({ name: "id_guvernment" })
  guvernment!: Relation<GuvernmentEntity>

}