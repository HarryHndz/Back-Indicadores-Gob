import {Topic} from '@/entities/index'
import {Repository} from 'typeorm'
import { AppDataSource } from '@/config/db'
export class TopicService{
  private topicRepository:Repository<Topic>
  constructor(){
    this.topicRepository = AppDataSource.getRepository(Topic)
  }
  async findAll(){
    return await this.topicRepository.find()
  }
  async findById(id:number){
    return await this.topicRepository.findOneBy({id})
  }
  async create(topic:Topic){
    return await this.topicRepository.save(topic)
  }
  async update(id:number,topic:Topic){
    return await this.topicRepository.update(id,topic)
  }
  async delete(id:number){
    return await this.topicRepository.delete(id)
  }
  async findByFormId(formId:number){
    return await this.topicRepository.find({
      where: {
        form: {
          id: formId,
        }
      },
      select:{
        id:true,
        name:true,
        active:true,
        createdAt:true,
        yearFiscal:true,
        update_period:true,
        form:{
          id:true,
          name:true
        }
      },
      relations:{
        form:true
      }
    })
  }
}

export type TTopicService = typeof TopicService.prototype