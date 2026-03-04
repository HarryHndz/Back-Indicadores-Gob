import { GuvernmentEntity } from "@/entities";
import { GuvernmentEntityService,TGuvernmentEntityService } from "@/service/guvernment-entity.service";
import { Request, Response } from "express";

const API_URL = 'http://localhost:3000'

export class GuvernmentEntityController{
  private guvernmentEntityService: TGuvernmentEntityService
  constructor(){
    this.guvernmentEntityService = new GuvernmentEntityService()
  }

  findAll = async (req:Request,res:Response)=>{
    try {
      const guvernmentEntities = await this.guvernmentEntityService.findAll()
      const guvernmentFormatted = guvernmentEntities.map((guvernment)=>{
        return {
          id:guvernment.id,
          name:guvernment.name,
          description:guvernment.description,
          isSubGuvernment:(!guvernment.isHaveSubGubernment && guvernment?.parentGubernment?.id) ? true : false,
          id_guvernment_parent:guvernment?.parentGubernment?.id,
          image: `${API_URL}/${guvernment.image}`
        }
      })
      res.status(200).json({ message: "Guvernment entities found successfully", data: guvernmentFormatted })
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
        data:{
          id:guvernmentEntity.id,
          name:guvernmentEntity.name,
          description:guvernmentEntity.description,
          isSubGuvernment:(!guvernmentEntity.isHaveSubGubernment && guvernmentEntity?.parentGubernment?.id) ? true : false,
          id_guvernment_parent:guvernmentEntity?.parentGubernment?.id,
          image: `${API_URL}/${guvernmentEntity.image}`
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({message:"Error al obtener la entidad gubernamental"})
    }
  }

  create = async (req:Request,res:Response)=>{
    try {
      const guvernment_entity = new GuvernmentEntity()
      const guvernment_data = req.body
      if(guvernment_data.id_guvernment_parent){
        const parentGubernment = await this.guvernmentEntityService.findById(guvernment_data.id_guvernment_parent)
        if(!parentGubernment){
          return res.status(404).json({message:"La dependencia no fue encontrada"})
        }
        guvernment_entity.parentGubernment = parentGubernment
        await this.guvernmentEntityService.update(
          guvernment_data.id_guvernment_parent,
          {
            ...parentGubernment,
            isHaveSubGubernment:true,
          }
        )
      }
      guvernment_entity.name = guvernment_data.name
      guvernment_entity.description = guvernment_data.description
      guvernment_entity.active = true
      const guvernment_entity_created = await this.guvernmentEntityService.create(guvernment_entity)
      res.status(200).json({
        message:"Entidad gubernamental creada correctamente",
        data:guvernment_entity_created
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear la entidad gubernamental"})
    }
  }

  update = async (req:Request,res:Response)=>{
    try {
      const id = Number(req.params.id)
      const guvernment_entity = await this.guvernmentEntityService.findById(id)
      if(!guvernment_entity){
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      const guvernment_data = req.body
      const guvernment_entity_updated = new GuvernmentEntity()

      if (guvernment_data.id_guvernment_parent) {
        if (guvernment_data.id_guvernment_parent !== guvernment_entity.parentGubernment?.id) {
          const old_parent_gubernment = await this.guvernmentEntityService.findById(guvernment_entity.parentGubernment?.id)
          if(!old_parent_gubernment){
            return res.status(404).json({message:"La dependencia no fue encontrada"})
          }

          await this.guvernmentEntityService.update(
            old_parent_gubernment?.id,
            {
              ...old_parent_gubernment,
              isHaveSubGubernment:false,
            }
          )
          const new_parent_gubernment = await this.guvernmentEntityService.findById(guvernment_data.id_guvernment_parent)
          if(!new_parent_gubernment){
            return res.status(404).json({message:"La dependencia no fue encontrada"})
          }
          await this.guvernmentEntityService.update(
            new_parent_gubernment?.id,
            {
              ...new_parent_gubernment,
              isHaveSubGubernment:true,
            }
          )
          guvernment_entity_updated.parentGubernment = new_parent_gubernment
        }else{
          const current_parent_gubernment = await this.guvernmentEntityService.findById(guvernment_entity.parentGubernment?.id)
          if(!current_parent_gubernment){
            return res.status(404).json({message:"La dependencia no fue encontrada"})
          }
          guvernment_entity_updated.parentGubernment = current_parent_gubernment
        }
      }

      guvernment_entity_updated.name = guvernment_data.name
      guvernment_entity_updated.description = guvernment_data.description
      guvernment_entity_updated.active = true
      const guvernment_entity_result = await this.guvernmentEntityService.update(id,guvernment_entity_updated)
      res.status(200).json({
        message:"Entidad gubernamental actualizada correctamente",
        data:guvernment_entity_result
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