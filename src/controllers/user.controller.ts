import { hashPassword } from "@/utils";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";

export class UserController{
  private userService: UserService
  constructor(){
    this.userService = new UserService()
  }

  async findById(req:Request,res:Response){
    try {
      const {id} = req.params
      const user = await this.userService.findById(Number(id))
      if(!user){
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ message: "User found successfully", user }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  async findAll(req:Request,res:Response){
    try {
      const users = await this.userService.findAll()
      res.status(200).json({ message: "Users found successfully", users }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  async create(req:Request,res:Response){
    try {
      const password = await hashPassword(req.body.password)
      const user = await this.userService.create({...req.body,password})
      res.status(201).json({ message: "User created successfully", user }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  async update(req:Request,res:Response){
    try {
      const {id} = req.params
      const newPassword = await hashPassword(req.body.password)
      const user = await this.userService.update(Number(id),{...req.body,password:newPassword})
      res.status(200).json({ message: "User updated successfully", user }) 
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  async delete(req:Request,res:Response){
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