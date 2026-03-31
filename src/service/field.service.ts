import {Field} from '@/entities/index'
import {FindManyOptions, Like, Repository} from 'typeorm'
import { AppDataSource } from '@/config/db'
import { TAKE } from '@/utils/pagination'

export class FieldService{
  private fieldRepository:Repository<Field>
  constructor(){
    this.fieldRepository = AppDataSource.getRepository(Field)
  }

  async findAllByFormId(formId:number,skip:number,allData:boolean = false,search?:string){
    return await this.fieldRepository.find({
      where:{
        form:{
          id:formId
        },
        key: search ? Like(`%${search.toLowerCase()}%`) : undefined,
      },
      select:{
        id:true,
        label:true,
        key:true,
        validations:true,
        active:true,
        placeholder:true,
        options:true,
        order_index:true,
        type:true,
        form:{
          id:true,
          name:true
        },
        topics:{
          id:true,
          name:true
        }
      },
      relations:{
        form:true,
        topics:true,
      },
      order:{
        order_index: 'ASC'
      },
      skip:!allData ? skip : undefined,
      take:!allData ? TAKE : undefined,
    })
  }
  async findById(id:number){
    return await this.fieldRepository.findOneBy({id})
  }
  async findAll(skip:number=1){
    return await this.fieldRepository.find({
      select:{
        id:true,
        key:true,
        label:true,
        type:true,
        placeholder:true,
        options:true,
        validations:true,
        order_index:true,
        active:true,
        createdAt:true,
        form:{
          id:true,
          name:true
        },
        topics:{
          id:true,
          name:true
        }
      },
      relations:{
        form:true,
        topics:true,
      },
      skip:skip,
      take:TAKE,
    })
  }
  async create(field:Field){
    return await this.fieldRepository.save(field)
  }
  async update(id:number,field:Field){
    return await this.fieldRepository.update(id,field)
  }
  async delete(id:number){
    return await this.fieldRepository.delete(id)
  }
  async findAllByTopicId(topicId:number){
    return await this.fieldRepository.find({
      where:{
        topics:{
          id:topicId
        }
      },
      select:{
        id:true,
        key:true,
        label:true,
        type:true,
        placeholder:true,
        options:true,
        validations:true,
        order_index:true,
        active:true,
        createdAt:true,
        form:{
          id:true,
          name:true
        },
        topics:{
          id:true,
          name:true
        }
      },
      relations:{
        form:true,
        topics:true,
      },
    })
  }
  async totalRegister(search?:string){
    return await this.fieldRepository.count({
      where:{
        key: search ? Like(`%${search.toLowerCase()}%`) : undefined,
      }
    })
  }
  async totalRegisterByFormId(formId:number,search?:string){
    return await this.fieldRepository.countBy({
      form:{
        id:formId
      },
      key: search ? Like(`%${search.toLowerCase()}%`) : undefined,
    })
  }
  async totalRegisterByTopicId(topicId:number,search?:string){
    return await this.fieldRepository.countBy({
      topics:{
        id:topicId
      },
      key: search ? Like(`%${search.toLowerCase()}%`) : undefined,
    })
  }
}

export type TFieldService = typeof FieldService.prototype