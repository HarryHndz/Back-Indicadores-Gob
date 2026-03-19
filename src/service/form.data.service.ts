import { FindOptionsWhere, Like, Repository } from "typeorm"
import { FormData } from "@/entities/index"
import { AppDataSource } from "@/config/db"
import { TAKE } from "@/utils/pagination"
import { WhereClause } from "typeorm/query-builder/WhereClause.js"

export class FormDataService {
  private formDataRepository: Repository<FormData>
  constructor(){
    this.formDataRepository = AppDataSource.getRepository(FormData)
  }
  async findAll(skip:number=1){
    return await this.formDataRepository.find({
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
      },
      take:TAKE,
      skip:skip,
    })
  }
  async findById(id:number){
    return await this.formDataRepository.findOneBy({id})
  }
  async create(data:FormData){
    return await this.formDataRepository.save(data)
  }
  async update(id:number,data:FormData){
    return await this.formDataRepository.update(id,data)
  }
  async delete(id:number){
    return await this.formDataRepository.delete(id)
  }
  async findByFormId(formId:number,skip:number=1,search?:string){
    return await this.formDataRepository.find({
      where: search
        ? [
            {
              form: {
                id: formId,
                name: Like(`%${search.toLowerCase()}%`),
              },
            },
            {
              form: {
                id: formId,
              },
              topic: {
                name: Like(`%${search.toLowerCase()}%`),
              },
            },
          ]
        : {
            form: {
              id: formId,
            },
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
      },
      take:TAKE,
      skip:skip,
    })
  }
  async findByTopicId(topicId:number,skip:number=1){
    return await this.formDataRepository.find({
      where:{
        topic:{
          id:topicId
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
      },
      take:TAKE,
      skip:skip,
    })
  }
  async findByGuvernmentId(guvermnetId:number,skip:number=1){
    return await this.formDataRepository.find({
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
      },
      take:TAKE,
      skip:skip,
    })
  }
  async totalRegister(search?:string){
    return await this.formDataRepository.count({
      where: search ? [
        {
          form: {
            name: Like(`%${search.toLowerCase()}%`),
          }
        },
        {
          topic:{
            name: Like(`%${search.toLowerCase()}%`),
          }
        }
      ] : undefined
    })
  }
  async totalRegisterByFormId(formId:number,search?:string){
    console.log("final",search)
    return await this.formDataRepository.count({
      where: search ? [
        {
          form: {
            id: formId,
            name: Like(`%${search.toLowerCase()}%`),
          }
        },
        {
          form:{
            id:formId
          },
          topic:{
            name: Like(`%${search.toLowerCase()}%`),
          }
        }
      ] : {
        form:{
          id:formId
        }
      }
    })
  }
  async totalRegisterByTopicId(topicId:number,search?:string){
    return await this.formDataRepository.count({
      where: search ? [
        {
          topic:{
            id:topicId,
            name:Like(`%${search.toLowerCase()}%`)
          }
        },
        {
          topic:{
            id:topicId
          },
          form:{
            name:Like(`%${search.toLowerCase()}%`)
          }
        }
      ] : {
        topic:{
          id:topicId
        }
      }
    })
  }
  async totalRegisterByGuvernmentId(guvernmentId:number){
    return await this.formDataRepository.countBy({
      form:{
        guvernment:{
          id:guvernmentId
        }
      }
    })
  }
}

export type TFormDataService = typeof FormDataService.prototype