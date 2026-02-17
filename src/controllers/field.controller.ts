import { FieldService, TFieldService } from "@/service/field.service";
import { Request, Response } from "express";
import { Field } from "@/entities/index";


export class FieldController{
  private fieldService:TFieldService
  constructor(){
    this.fieldService = new FieldService()
  }
  async findById(req:Request,res:Response){
    try {
      const {id} = req.params
      const field = await this.fieldService.findById(Number(id))
      res.status(200).json({
        message:"Campo obtenido correctamente",
        data:field
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el campo"})
    }
  }
  async create(req:Request,res:Response){
    try {
      const fieldData = new Field()
      fieldData.key = req.body.key
      fieldData.label = req.body.label
      fieldData.type = req.body.type
      fieldData.form = req.body.formId
      fieldData.validations = req.body.validations
      fieldData.options = req.body.options
      fieldData.order_index = req.body.order_index
      fieldData.depends_on_value = req.body.depends_on_value
      fieldData.dependsOnField = req.body.dependsOnField
      const field = await this.fieldService.create(fieldData)
      res.status(201).json({
        message:"Campo creado correctamente",
        data:field
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear el campo"})
    }
  }
  async update(req:Request,res:Response){
    try {
      const {id} = req.params
      const fieldData = new Field()
      fieldData.key = req.body.key
      fieldData.label = req.body.label
      fieldData.type = req.body.type
      fieldData.form = req.body.formId
      fieldData.validations = req.body.validations
      fieldData.options = req.body.options
      fieldData.order_index = req.body.order_index
      fieldData.depends_on_value = req.body.depends_on_value
      fieldData.dependsOnField = req.body.dependsOnField
      const field = await this.fieldService.update(Number(id),fieldData)
      res.status(200).json({
        message:"Campo actualizado correctamente",
        data:field
      })
    } catch (error) {
      res.status(500).json({message:"Error al actualizar el campo"})
    }
  }
  async delete(req:Request,res:Response){
    try {
      const {id} = req.params
      await this.fieldService.delete(Number(id))
      res.status(200).json({
        message:"Campo eliminado correctamente"
      })
    } catch (error) {
      res.status(500).json({message:"Error al eliminar el campo"})
    }
  }
  async findAll(req:Request,res:Response){
    try {
      const formId = req.query.formId as string
      if (formId) {
        const fields = await this.fieldService.findAllByFormId(Number(formId))
        return res.status(200).json({
          message:"Campos obtenidos correctamente",
          data:fields
        })
      }
      const fields = await this.fieldService.findAll()
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fields
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los campos"})
    }
  }
}