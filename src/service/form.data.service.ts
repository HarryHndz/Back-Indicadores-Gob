import { Repository } from "typeorm"
import { FormData } from "@/entities/index"
import { AppDataSource } from "@/config/db"

export class FormDataService {
  private formDataRepository: Repository<FormData>
  constructor(){
    this.formDataRepository = AppDataSource.getRepository(FormData)
  }
  async findAll(){
    return this.formDataRepository.find({
      select:{
        id:true,
        topic:{
          id:true,
          name:true,
        },
        form:{
          id:true,
          name:true,
        },
        user:{
          id:true,
          name:true,
        },
        data:true,
        edit:true,
        active:true,
        createdAt:true,
      },
      relations:{
        topic:true,
        form:true,
        user:true,
      }
    })
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
      },
      select:{
        id:true,
        topic:{
          id:true,
          name:true,
        },
        form:{
          id:true,
          name:true,
        },
        user:{
          id:true,
          name:true,
        },
        data:true,
        edit:true,
        active:true,
        createdAt:true,
      },
      relations:{
        topic:true,
        form:true,
        user:true,
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
  async findByGuvernmentId(guvermnetId:number){
    return this.formDataRepository.find({
      where:{
        form:{
          guvernment:{
            id:guvermnetId
          }
        }
      },
      select:{
        id:true,
        topic:{
          id:true,
          name:true,
        },
        form:{
          id:true,
          name:true,
        },
        user:{
          id:true,
          name:true,
        },
        data:true,
        edit:true,
        active:true,
        createdAt:true,
      },
      relations:{
        topic:true,
        form:true,
        user:true,
      }
    })
  }
}

export type TFormDataService = typeof FormDataService.prototype