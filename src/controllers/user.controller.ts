import { hashPassword } from "@/utils";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";
import { User } from "@/entities";
import { RolService } from "@/service/rol.service";
import { GuvernmentEntityService } from "@/service/guvernment-entity.service";
export class UserController{
  private userService: UserService
  constructor(){
    this.userService = new UserService()
  }

  findById = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const user = await this.userService.findById(Number(id))
      if(!user){
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ message: "User found successfully",
        data:{
          id:user.id,
          name:user.name,
          email:user.email,
          status:user.active,
          id_rol:user.rol.id,
          role_name:user.rol.name,
          created_at:user.createdAt,
          id_guvernment:user.guvernment.id,
          guvernment_name:user.guvernment.name,
        }
      }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  findAll = async (req:Request,res:Response)=>{
    try {
      const users = await this.userService.findAll()
      const userFormatted = users.map((user)=>{
        return {
          id:user.id,
          name:user.name,
          email:user.email,
          active:user.active,
          id_rol:user.rol.id,
          role_name:user.rol.name,
          created_at:user.createdAt,
          id_guvernment:user.guvernment.id,
          guvernment_name:user.guvernment.name,
        }
      })
      return res.status(200).json({ 
        message: "Users found successfully", 
        data:userFormatted
      }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  create = async (req:Request,res:Response)=>{
    try {
      const rolService = new RolService()
      const rolUser = await rolService.findById(Number(req.body.id_rol))
      if (!rolUser) {
        return res.status(404).json({ message: "El rol no existe" })
      }

      const guvernmentService = new GuvernmentEntityService()
      const guvernmentUser = await guvernmentService.findById(Number(req.body.id_guvernment))
      if (!guvernmentUser) {
        return res.status(404).json({ message: "La entidad gubernamental no existe" })
      }
      const password = await hashPassword(req.body.password)
      const userCreated = new User()
      userCreated.name = req.body.name
      userCreated.email = req.body.email
      userCreated.password = password
      userCreated.active = true
      userCreated.rol = rolUser
      userCreated.guvernment = guvernmentUser
      const user = await this.userService.create(userCreated)
      res.status(201).json({ 
        message: "User created successfully",
        data:{
          id: user.id,
          name: user.name,
          email: user.email,
          role_name: user.rol.name,
          id_rol:user.rol.id,
          government_name: user.guvernment.name,
          id_government: user.guvernment.id,
      } }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  update = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const userExist = await this.userService.findById(Number(id))
      if (!userExist) {
        return res.status(404).json({ message: "User not found" })
      }
      const rolService = new RolService()
      const rolUser = await rolService.findById(Number(req.body.id_rol))
      if (!rolUser) {
        return res.status(404).json({ message: "El rol no existe" })
      }
      const guvernmentService = new GuvernmentEntityService()
      const guvernmentUser = await guvernmentService.findById(Number(req.body.id_guvernment))
      if (!guvernmentUser) {
        return res.status(404).json({ message: "La entidad gubernamental no existe" })
      }
      const user_data = req.body
      const user_entity = new User()
      user_entity.name = user_data.name
      user_entity.email = user_data.email
      user_entity.rol = rolUser
      user_entity.guvernment = guvernmentUser
      if (user_data.password || user_data.password !== "") {
        const newPassword = await hashPassword(req.body.password)
        user_entity.password = newPassword
      }
      const user = await this.userService.update(Number(id),user_entity)
      res.status(200).json({ message: "User updated successfully", user }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  delete = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const userExist = await this.userService.findById(Number(id))
      if(!userExist){
        return res.status(404).json({ message: "User not found" })
      }
      const user = await this.userService.delete(userExist.id)
      res.status(200).json({ message: "User deleted successfully", user }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}