import { AppDataSource } from '@/config/db'
import { GuvernmentEntity } from '@/entities/index'
import { Repository } from 'typeorm'
import { TAKE } from '@/utils/pagination'

export class GuvernmentEntityService{
  private guvernmentEntityRepository: Repository<GuvernmentEntity>
  constructor(){
    this.guvernmentEntityRepository = AppDataSource.getRepository(GuvernmentEntity)
  }

  async findAll(skip:number=1){
    return await this.guvernmentEntityRepository.find({
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
      },
      skip:skip,
      take:TAKE
    })
  }

  async findById(id:number){
    return await this.guvernmentEntityRepository.findOne({
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
    return await this.guvernmentEntityRepository.save(guvernmentEntity)
  }

  async update(id:number,guvernmentEntity:GuvernmentEntity){
    return await this.guvernmentEntityRepository.update(id,guvernmentEntity)
  }

  async delete(id:number){
    return await this.guvernmentEntityRepository.delete(id)
  }
  async totalRegister(){
    return await this.guvernmentEntityRepository.count()
  }

}


export type TGuvernmentEntityService = typeof GuvernmentEntityService.prototype