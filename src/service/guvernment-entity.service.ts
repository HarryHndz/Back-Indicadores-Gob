import { AppDataSource } from '@/config/db'
import { GuvernmentEntity } from '@/entities/index'
import { Repository } from 'typeorm'

export class GuvernmentEntityService{
  private guvernmentEntityRepository: Repository<GuvernmentEntity>
  constructor(){
    this.guvernmentEntityRepository = AppDataSource.getRepository(GuvernmentEntity)
  }

  async findAll(){
    return this.guvernmentEntityRepository.find({
      select:{
        id:true,
        name:true,
        description:true,
        image:true,
        isHaveSubGubernment:true,
        parentGubernment:{
          id:true,
          name:true,
        }
      },
      relations:{
        parentGubernment:true,
      }
    })
  }

  async findById(id:number){
    return this.guvernmentEntityRepository.findOne({
      where:{id},
      select:{
        id:true,
        name:true,
        description:true,
        image:true,
        isHaveSubGubernment:true,
        parentGubernment:{
          id:true,
          name:true,
        }
      },
      relations:{
        parentGubernment:true,
      }
    })
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