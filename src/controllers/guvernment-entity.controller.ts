import { GuvernmentEntity } from "@/entities";
import { GuvernmentEntityService,TGuvernmentEntityService } from "@/service/guvernment-entity.service";
import { Request, Response } from "express";


export class GuvernmentEntityController{
  private guvernmentEntityService: TGuvernmentEntityService
  constructor(){
    this.guvernmentEntityService = new GuvernmentEntityService()
  }

  findAll = async (req:Request,res:Response)=>{
    try {
      const guvernmentEntities = await this.guvernmentEntityService.findAll()
      res.status(200).json({ message: "Guvernment entities found successfully", data: guvernmentEntities })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error" })
    }
  }

  findById = async (req:Request,res:Response)=>{
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

  create = async (req:Request,res:Response)=>{
    try {
      const guvernment_entity = new GuvernmentEntity()
      const guvernment_data = req.body
      guvernment_entity.name = guvernment_data.name
      guvernment_entity.description = guvernment_data.description
      guvernment_entity.active = true
      guvernment_entity.isHaveSubGubernment= guvernment_data.isHaveSubGubernment
      const guvernment_entity_created = await this.guvernmentEntityService.create(guvernment_entity)
      let subGubernmentEntities: GuvernmentEntity[] = []
      if(guvernment_data.isHaveSubGubernment && guvernment_data.subGubernment?.length > 0){
        for(const subGubernment of guvernment_data.subGubernment){
          const subGubernmentEntity = new GuvernmentEntity()
          subGubernmentEntity.name = subGubernment.name
          subGubernmentEntity.description = subGubernment.description
          subGubernmentEntity.active = true
          subGubernmentEntity.parentGubernment = guvernment_entity_created
          await this.guvernmentEntityService.create(subGubernmentEntity)
          subGubernmentEntities.push(subGubernmentEntity)
        }
      }
      res.status(200).json({
        message:"Entidad gubernamental creada correctamente",
        data:{
          ...guvernment_entity_created,
          subGubernment: subGubernmentEntities
        }
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear la entidad gubernamental"})
    }
  }

  update = async (req:Request,res:Response)=>{
    try {
      const id = Number(req.params.id)
      const guvernment_data = req.body
      const guvernment_entity = new GuvernmentEntity()
      guvernment_entity.name = guvernment_data.name
      guvernment_entity.description = guvernment_data.description
      guvernment_entity.active = true
      guvernment_entity.isHaveSubGubernment= guvernment_data.isHaveSubGubernment
      guvernment_entity.parentGubernment = guvernment_data.id_parent_gubernment
      const guvernment_entity_updated = await this.guvernmentEntityService.update(id,guvernment_entity)
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

  delete = async (req:Request,res:Response)=>{
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