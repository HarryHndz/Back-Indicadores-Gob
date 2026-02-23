import { Rol } from '@/entities'
import {RolService,TRolService} from '@/service/rol.service'
import { Request, Response } from 'express'

export class RolController{
  private rolService:TRolService
  constructor(){
    this.rolService = new RolService()
  }
  findAll = async(req:Request,res:Response)=>{
    try {
      const roles = await this.rolService.findAll()
      return res.status(200).json({
        message:"Roles encontrados correctamente",
        data:roles
      })
    } catch (error) {
      return res.status(500).json({message:"Error al obtener los roles"})
    }
  }
  findById = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const role = await this.rolService.findById(Number(id))
      if(!role){
        return res.status(404).json({message:"Rol no encontrado"})
      }
      return res.status(200).json({
        message:"Rol encontrado correctamente",
        data:role
      })
    } catch (error) {
      return res.status(500).json({message:"Error al obtener el rol"})
    }
  }
  create = async(req:Request,res:Response)=>{
    try {
      const data = req.body
      const dataRol = new Rol()
      dataRol.name = data.name
      dataRol.createdAt = new Date()
      const role = await this.rolService.create(dataRol)
      return res.status(201).json({
        message:"Rol creado correctamente",
        data:role
      })
    } catch (error) {
      return res.status(500).json({message:"Error al crear el rol"})
    }
  }
  update = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const data = req.body
      const roleExist = await this.rolService.findById(Number(id))
      if(!roleExist){
        return res.status(404).json({message:"Rol no encontrado"})
      }
      const dataRol = new Rol()
      dataRol.name = data.name
      dataRol.createdAt = roleExist.createdAt
      const role = await this.rolService.update(Number(id),dataRol)
      return res.status(200).json({
        message:"Rol actualizado correctamente",
        data:role
      })
    } catch (error) {
      return res.status(500).json({message:"Error al actualizar el rol"})
    }
  }
  delete = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const role = await this.rolService.findById(Number(id))
      if(!role){
        return res.status(404).json({message:"Rol no encontrado"})
      }
      await this.rolService.delete(Number(id))
      return res.status(200).json({message:"Rol eliminado correctamente"})
    } catch (error) {
      return res.status(500).json({message:"Error al eliminar el rol"})
    }
  }
}