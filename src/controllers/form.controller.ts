import { FormService, TFormService } from "@/service/form.service";
import { GuvernmentEntityService, TGuvernmentEntityService } from "@/service/guvernment-entity.service";
import { Request, Response } from "express";

export class FormController{
  private formService:TFormService
  private guvernmentEntityService:TGuvernmentEntityService
  constructor(){
    this.formService = new FormService()
    this.guvernmentEntityService = new GuvernmentEntityService()
  }

  findAll = async (req:Request,res:Response)=>{
    try {
      const {gubernmentId} = req.query
      if (gubernmentId) {
        const guvernamentExits = await this.guvernmentEntityService.findById(Number(gubernmentId))
        if(!guvernamentExits){
          return res.status(404).json({message:"Entidad gubernamental no encontrada"})
        }
        const formsByGubernment = await this.formService.findAllByGubernmentId(guvernamentExits.id)
        const formsFormatted = formsByGubernment.map((form)=>{
          return {
            id:form.id,
            name:form.name,
            active:form.active,
            description:form.description,
            createdAt:form.createdAt,
            id_gubernment:form.guvernment.id,
            total_fields:form.fields.length ?? 0,
            total_data:form.formData.length ?? 0,
            gubernment_name:form.guvernment.name,
          }
        })
        return res.status(200).json({
          message:"Formularios obtenidos correctamente",
          data:formsFormatted
        })
      }
      
      const forms = await this.formService.findAll()
      const formsFormatted = forms.map((form)=>{
        return {
          id:form.id,
          name:form.name,
          active:form.active,
          description:form.description,
          createdAt:form.createdAt,
          id_gubernment:form.guvernment.id,
          total_fields:form.fields.length ?? 0,
          total_data:form.formData.length ?? 0,
          gubernment_name:form.guvernment.name,
        }
      })
      return res.status(200).json({
        message:"Formularios obtenidos correctamente",
        data:formsFormatted
      })
    } catch (error) {
      return res.status(500).json({message:"Error al obtener los formularios"})
    }
  }

  findById = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const form = await this.formService.findById(Number(id))
      if(!form){
        return res.status(404).json({message:"Formulario no encontrado"})
      }
      res.status(200).json({
        message:"Formulario obtenido correctamente",
        data:form
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el formulario"})
    }
  }

  create = async (req:Request,res:Response)=>{
    try {
      const form = await this.formService.create(req.body)
      return res.status(201).json({
        message:"Formulario creado correctamente",
        data:form
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear el formulario"})
    }
  }

  update = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const formExist = await this.formService.findById(Number(id))
      if(!formExist){
        return res.status(404).json({message:"Formulario no encontrado"})
      }
      const formUpdated = await this.formService.update(Number(id),req.body)
      return res.status(200).json({
        message:"Formulario actualizado correctamente",
        data:formUpdated
      })
    } catch (error) {
      res.status(500).json({message:"Error al actualizar el formulario"})
    }
  }

  delete = async (req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const formExist = await this.formService.findById(Number(id))
      if(!formExist){
        return res.status(404).json({message:"Formulario no encontrado"})
      }
      const form = await this.formService.delete(Number(id))
      return res.status(200).json({
        message:"Formulario eliminado correctamente",
        data:form
      })
    } catch (error) {
      res.status(500).json({message:"Error al eliminar el formulario"})
    }
  }
}