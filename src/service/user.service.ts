import { AppDataSource } from "@/config/db";
import { User } from "@/entities/User";
import { Repository } from "typeorm";

export class UserService{
  private userRepository: Repository<User>
  constructor(){
    this.userRepository = AppDataSource.getRepository(User)
  }

  async findById(id:number){
    return await this.userRepository.findOneBy({id})
  }
  async findAll(){
    return await this.userRepository.find({
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
      }
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
}

export type TUserService = typeof UserService.prototype