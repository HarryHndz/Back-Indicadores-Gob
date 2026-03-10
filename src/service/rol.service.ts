import {Rol} from "@/entities/index"
import { Repository } from "typeorm"
import { AppDataSource } from "@/config/db"

export class RolService{
  private rolRepository:Repository<Rol>
  constructor(){
    this.rolRepository = AppDataSource.getRepository(Rol)
  }
  async findAll(){
    return await this.rolRepository.find()
  }
  async findById(id:number){
    return await this.rolRepository.findOneBy({id})
  }
  async create(rol:Rol){
    return await this.rolRepository.save(rol)
  }
  async update(id:number,rol:Rol){
    return await this.rolRepository.update(id,rol)
  } 
  async delete(id:number){
    return await this.rolRepository.delete(id)
  }
}

export type TRolService = typeof RolService.prototype