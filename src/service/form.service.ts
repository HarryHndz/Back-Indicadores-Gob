import { AppDataSource } from "@/config/db";
import { Form } from "@/entities/index";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { TAKE } from "@/utils/pagination";

export class FormService{
  private formRepository:Repository<Form>
  constructor(){
    this.formRepository = AppDataSource.getRepository(Form)
  }

  async findAll(skip:number=1,search?:string){
    let where:FindOptionsWhere<Form> = {}
    if(search){
      where.name = Like(`%${search.toLowerCase()}%`)
    }
    return await this.formRepository.find({
      where,
      relations:{
        guvernment:true,
        fields:true,
        formData:true,
      },
      select:{
        id:true,
        name:true,
        active:true,
        createdAt:true,
        description:true,
        guvernment:{
          id:true,
          name:true,
        },
        fields:{
          id:true
        },
        formData:{
          id:true,
        }
      },
      skip,
      take:TAKE,
    })
  }

  async findById(id:number){
    return await this.formRepository.findOne({
      where:{
        id
      },
      select:{
        id:true,
        name:true,
        active:true,
        createdAt:true,
        description:true,
        guvernment:{
          id:true,
          name:true,
        },
        topic:{
          id:true,
          name:true,
        },
      },
      relations:{
        guvernment:true,
        topic:true,
      }
    })
  }

  async create(form:Form){
    return await this.formRepository.save(form)
  }

  async update(id:number,form:Form){
    return await this.formRepository.update(id,form)
  }

  async delete(id:number){
    return await this.formRepository.delete(id)
  }

  async findAllByGubernmentId(gubernmentId:number,skip:number=1,search?:string){
    return await this.formRepository.find({
      where:{
        guvernment:{
          id:gubernmentId
        },
        name: search ? Like(`%${search.toLowerCase()}%`) : undefined,
      },
      relations:{
        guvernment:true,
        fields:true,
        formData:true,
      },
      select:{
        id:true,
        name:true,
        active:true,
        createdAt:true,
        description:true,
        guvernment:{
          id:true,
          name:true,
        },
        fields:{
          id:true
        },
        formData:{
          id:true,
        }
      },
      take:TAKE,
      skip:skip,
    })
  }

  async findAllByGuvernmentIdWithTopics(guvernmentId:number,skip:number=1){
    return await this.formRepository.find({
      where:{
        guvernment:{
          id:guvernmentId
        }
      },
      relations:{
        guvernment:true,
        topic:true,
      },
      select:{
        id:true,
        name:true,
        active:true,
        createdAt:true,
        description:true,
        guvernment:{
          id:true,
          name:true,
        },
        topic:{
          id:true,
          name:true,
          yearFiscal:true,
          update_period:true,
          createdAt:true,
        }
      },
      skip,
      take:TAKE
    })
  }

  async totalRegister(search?:string){
    let where:FindOptionsWhere<Form> = {}
    if(search){
      where.name = Like(`%${search.toLowerCase()}%`)
    }
    return await this.formRepository.count({
      where,
    })
  }
  
  async totalRegisterByGubernmentId(gubernmentId:number,search?:string){
    return await this.formRepository.countBy({
      guvernment:{
        id:gubernmentId
      },
      name: search ? Like(`%${search.toLowerCase()}%`) : undefined,
    })
  }
}

export type TFormService = typeof FormService.prototype