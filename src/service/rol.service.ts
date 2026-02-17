import {Rol} from "@/entities/index"
import { Repository } from "typeorm"
import { AppDataSource } from "@/config/db"

export class RolService{
  private rolRepository:Repository<Rol>
  constructor(){
    this.rolRepository = AppDataSource.getRepository(Rol)
  }
  async findAll(){
    return this.rolRepository.find()
  }
  async findById(id:number){
    return this.rolRepository.findOneBy({id})
  }
  async create(rol:Rol){
    return this.rolRepository.save(rol)
  }
  async update(id:number,rol:Rol){
    return this.rolRepository.update(id,rol)
  }
  async delete(id:number){
    return this.rolRepository.delete(id)
  }
}