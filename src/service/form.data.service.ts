import { Repository } from "typeorm"
import { FormData } from "@/entities/index"
import { AppDataSource } from "@/config/db"

export class FormDataService {
  private formDataRepository: Repository<FormData>
  constructor(){
    this.formDataRepository = AppDataSource.getRepository(FormData)
  }
  async findAll(){
    return this.formDataRepository.find()
  }
  async findById(id:number){
    return this.formDataRepository.findOneBy({id})
  }
  async create(data:FormData){
    return this.formDataRepository.save(data)
  }
  async update(id:number,data:FormData){
    return this.formDataRepository.update(id,data)
  }
  async delete(id:number){
    return this.formDataRepository.delete(id)
  }
  async findByFormId(formId:number){
    return this.formDataRepository.find({
      where:{
        form:{
          id:formId
        }
      }
    })
  }
  async findByTopicId(topicId:number){
    return this.formDataRepository.find({
      where:{
        topic:{
          id:topicId
        }
      }
    })
  }
}

export type TFormDataService = typeof FormDataService.prototype