import { AppDataSource } from "@/config/db";
import { User } from "@/entities/User";
import { TAKE } from "@/utils/pagination";
import { Like, Repository } from "typeorm";

export class UserService{
  private userRepository: Repository<User>
  constructor(){
    this.userRepository = AppDataSource.getRepository(User)
  }

  async findById(id:number){
    return await this.userRepository.findOne({
      where:{id},
      relations:{
        rol:true,
        guvernment:true,
      },
      select:{
        id:true,
        name:true,
        email:true,
        active:true,
        createdAt:true,
        rol:{
          id:true,
          name:true,
        },
        guvernment:{
          id:true,
          name:true,
        }
      }
    })
  }
  async findAll(skip:number=1,search?:string){
    return await this.userRepository.find({
      where: search ? {
        name: Like(`%${search.toLowerCase()}%`)
      } : undefined,
      select:{
        id:true,
        name:true,
        email:true,
        active:true,
        createdAt:true,
        rol:{
          id:true,
          name:true,
        },
        guvernment:{
          id:true,
          name:true,
        }
      },
      relations:{
        rol:true,
        guvernment:true,
      },
      skip,
      take:TAKE,
    })
  }
  async create(user:User){
    return await this.userRepository.save(user)
  }
  async update(id:number,user:User){
    return await this.userRepository.update(id,user)
  }
  async delete(id:number){
    return await this.userRepository.delete(id)
  }
  async findByEmail(email:string){
    return await this.userRepository.findOne({
      where: { email },
      relations:{
        rol:true,
        guvernment:true,
      }
    });
  }
  async totalRegister(search?:string){
    return await this.userRepository.count({
      where: search ? {
        name: Like(`%${search.toLowerCase()}%`)
      } : undefined,
    })
  }
  async totalRegisterByGuvernmentId(guvernmentId:number,search?:string){
    return await this.userRepository.countBy({
      guvernment:{
        id:guvernmentId
      },
      name: search ? Like(`%${search.toLowerCase()}%`) : undefined,
    })
  }
}

export type TUserService = typeof UserService.prototype