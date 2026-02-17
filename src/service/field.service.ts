import {Field} from '@/entities/index'
import {Repository} from 'typeorm'
import { AppDataSource } from '@/config/db'

export class FieldService{
  private fieldRepository:Repository<Field>
  constructor(){
    this.fieldRepository = AppDataSource.getRepository(Field)
  }

  async findAllByFormId(formId:number){
    return this.fieldRepository.find({
      where:{
        form:{
          id:formId
        }
      },
      order:{
        order_index: 'ASC'
      }
    })
  }
  async findById(id:number){
    return this.fieldRepository.findOneBy({id})
  }
  async findAll(){
    return this.fieldRepository.find()
  }
  async create(field:Field){
    return this.fieldRepository.save(field)
  }
  async update(id:number,field:Field){
    return this.fieldRepository.update(id,field)
  }
  async delete(id:number){
    return this.fieldRepository.delete(id)
  }
}

export type TFieldService = typeof FieldService.prototype