import {Field} from '@/entities/index'
import {Repository} from 'typeorm'
import { AppDataSource } from '@/config/db'
import { TAKE } from '@/utils/pagination'

export class FieldService{
  private fieldRepository:Repository<Field>
  constructor(){
    this.fieldRepository = AppDataSource.getRepository(Field)
  }

  async findAllByFormId(formId:number,skip:number=1){
    return await this.fieldRepository.find({
      where:{
        form:{
          id:formId
        }
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
          id:true
        },
        topic:{
          id:true
        }
      },
      relations:{
        form:true,
        topic:true,
      },
      order:{
        order_index: 'ASC'
      },
      skip:skip,
      take:TAKE,
    })
  }
  async findById(id:number){
    return await this.fieldRepository.findOneBy({id})
  }
  async findAll(skip:number=1){
    return await this.fieldRepository.find({
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
        topic:{
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
        topic:{
          id:true,
          name:true
        }
      },
      relations:{
        form:true,
        topic:true,
      },
    })
  }
  async totalRegister(){
    return await this.fieldRepository.count()
  }
  async totalRegisterByFormId(formId:number){
    return await this.fieldRepository.countBy({
      form:{
        id:formId
      }
    })
  }
  async totalRegisterByTopicId(topicId:number){
    return await this.fieldRepository.countBy({
      topic:{
        id:topicId
      }
    })
  }
}

export type TFieldService = typeof FieldService.prototype