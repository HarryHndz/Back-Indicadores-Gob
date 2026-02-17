import {Topic} from '@/entities/index'
import {Repository} from 'typeorm'
import { AppDataSource } from '@/config/db'
export class TopicService{
  private topicRepository:Repository<Topic>
  constructor(){
    this.topicRepository = AppDataSource.getRepository(Topic)
  }
  async findAll(){
    return this.topicRepository.find()
  }
  async findById(id:number){
    return this.topicRepository.findOneBy({id})
  }
  async create(topic:Topic){
    return this.topicRepository.save(topic)
  }
  async update(id:number,topic:Topic){
    return this.topicRepository.update(id,topic)
  }
  async delete(id:number){
    return this.topicRepository.delete(id)
  }
  async findAllByGovernmentEntityId(governmentEntityId:number){
    return this.topicRepository.find({
      where: {
        governmentEntity: {
          id: governmentEntityId
        }
      }
    })
  }
}

export type TTopicService = typeof TopicService.prototype