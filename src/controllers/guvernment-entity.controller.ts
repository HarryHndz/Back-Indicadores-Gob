import { GuvernmentEntityService,TGuvernmentEntityService } from "@/service/guvernment-entity.service";
import { Request, Response } from "express";


export class GuvernmentEntityController{
  private guvernmentEntityService: TGuvernmentEntityService
  constructor(){
    this.guvernmentEntityService = new GuvernmentEntityService()
  }

  async findAll(req:Request,res:Response){
    try {
      const guvernmentEntity = await this.guvernmentEntityService.findAll()
      res.status(200).json({
        message:"Entidades gubernamentales obtenidas correctamente",
        data:guvernmentEntity
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener las entidades gubernamentales"})
    }
  }

  async findById(req:Request,res:Response){
    try {
      const id = Number(req.params.id)
      const guvernmentEntity = await this.guvernmentEntityService.findById(id)
      if (!guvernmentEntity) {
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      res.status(200).json({
        message:"Entidad gubernamental obtenida correctamente",
        data:guvernmentEntity
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener la entidad gubernamental"})
    }
  }

  async create(req:Request,res:Response){
    try {
      const guvernmentEntity = await this.guvernmentEntityService.create(req.body)
      res.status(200).json({
        message:"Entidad gubernamental creada correctamente",
        data:guvernmentEntity
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear la entidad gubernamental"})
    }
  }

  async update(req:Request,res:Response){
    try {
      const id = Number(req.params.id)
      const guvernmentEntity = await this.guvernmentEntityService.findById(id)
      if (!guvernmentEntity) {
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      const guvernmentEntityUpdated = await this.guvernmentEntityService.update(id,req.body)
      res.status(200).json({
        message:"Entidad gubernamental actualizada correctamente",
        data:guvernmentEntityUpdated
      })
    } catch (error) {
      res.status(500).json({message:"Error al actualizar la entidad gubernamental"})
    }
  }

  async delete(req:Request,res:Response){
    try {
      const id = Number(req.params.id)
      const guvernmentEntity = await this.guvernmentEntityService.findById(id)
      if (!guvernmentEntity) {
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      const guvernmentEntityDeleted = await this.guvernmentEntityService.delete(id)
      res.status(200).json({
        message:"Entidad gubernamental eliminada correctamente",
        data:guvernmentEntityDeleted
      })
    } catch (error) {
      res.status(500).json({message:"Error al eliminar la entidad gubernamental"})
    }
  }

}