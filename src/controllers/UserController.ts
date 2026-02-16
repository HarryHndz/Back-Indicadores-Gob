import { UserService } from "../service/UserService";
import { Request, Response } from "express";

export class UserController{
  private userService: UserService
  constructor(){
    this.userService = new UserService()
  }

  async findById(req:Request,res:Response){
    const {id} = req.params
    const user = await this.userService.findById(Number(id))
    res.json(user)
  }

  async findAll(req:Request,res:Response){
    const users = await this.userService.findAll()
    res.json(users)
  }

  async create(req:Request,res:Response){
    const user = await this.userService.create(req.body)
    res.json(user)
  }

  async update(req:Request,res:Response){
    const {id} = req.params
    const user = await this.userService.update(Number(id),req.body)
    res.json(user)
  }

  async delete(req:Request,res:Response){
    const {id} = req.params
    const user = await this.userService.delete(Number(id))
    res.json(user)
  }
}