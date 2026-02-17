import { AppDataSource } from '@/config/db'
import { GuvernmentEntity } from '@/entities/index'
import { Repository } from 'typeorm'

export class GuvernmentEntityService{
  private guvernmentEntityRepository: Repository<GuvernmentEntity>
  constructor(){
    this.guvernmentEntityRepository = AppDataSource.getRepository(GuvernmentEntity)
  }

  async findAll(){
    return this.guvernmentEntityRepository.find()
  }

  async findById(id:number){
    return this.guvernmentEntityRepository.findOneBy({id})
  }

  async create(guvernmentEntity:GuvernmentEntity){
    return this.guvernmentEntityRepository.save(guvernmentEntity)
  }

  async update(id:number,guvernmentEntity:GuvernmentEntity){
    return this.guvernmentEntityRepository.update(id,guvernmentEntity)
  }

  async delete(id:number){
    return this.guvernmentEntityRepository.delete(id)
  }

}


export type TGuvernmentEntityService = typeof GuvernmentEntityService.prototype