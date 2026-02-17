import { AppDataSource } from "@/config/db";
import { User } from "@/entities/User";
import { Repository } from "typeorm";

export class UserService{
  private userRepository: Repository<User>
  constructor(){
    this.userRepository = AppDataSource.getRepository(User)
  }

  async findById(id:number){
    return this.userRepository.findOneBy({id})
  }
  async findAll(){
    return this.userRepository.find()
  }
  async create(user:User){
    return this.userRepository.save(user)
  }
  async update(id:number,user:User){
    return this.userRepository.update(id,user)
  }
  async delete(id:number){
    return this.userRepository.delete(id)
  }
  async findByEmail(email:string){
    return this.userRepository.findOne({
      where: { email },
      relations: ['rol', 'guvernment'] 
    });
  }
}