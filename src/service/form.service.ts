import { AppDataSource } from "@/config/db";
import { Form } from "@/entities/index";
import { Repository } from "typeorm";

export class FormService{
  private formRepository:Repository<Form>
  constructor(){
    this.formRepository = AppDataSource.getRepository(Form)
  }

  async findAll(){
    return this.formRepository.find()
  }

  async findById(id:number){
    return this.formRepository.findOneBy({id})
  }

  async create(form:Form){
    return this.formRepository.save(form)
  }

  async update(id:number,form:Form){
    return this.formRepository.update(id,form)
  }

  async delete(id:number){
    return this.formRepository.delete(id)
  }
}

export type TFormService = typeof FormService.prototype