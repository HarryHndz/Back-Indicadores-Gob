import { FormService, TFormService } from "@/service/form.service";
import { Request, Response } from "express";

export class FormController{
  private formService:TFormService
  constructor(){
    this.formService = new FormService()
  }

  async findAll(req:Request,res:Response){
    try {
      const forms = await this.formService.findAll()
      res.status(200).json({
        message:"Formularios obtenidos correctamente",
        data:forms
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los formularios"})
    }
  }

  async findById(req:Request,res:Response){
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

  async create(req:Request,res:Response){
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

  async update(req:Request,res:Response){
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

  async delete(req:Request,res:Response){
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