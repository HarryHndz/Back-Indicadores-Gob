import { FieldService, TFieldService } from "@/service/field.service";
import { Request, Response } from "express";
import { Field } from "@/entities/index";
import { FormService } from "@/service/form.service";
import { TopicService } from "@/service/topic.service";
import { DATA_TYPE_VALIDATION_RULES } from "@/utils/validation.rules";


export class FieldController{
  private fieldService:TFieldService
  constructor(){
    this.fieldService = new FieldService()
  }

  findById =async(req:Request,res:Response)=>{
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
  create = async(req:Request,res:Response)=>{
    try {
      const fieldData = new Field()
      fieldData.key = req.body.name
      fieldData.label = req.body.label
      fieldData.placeholder = req.body.placeholder
      fieldData.type = req.body.type
      fieldData.form = req.body.id_form
      fieldData.topic = req.body.id_topic
      fieldData.validations = {v: req.body.validations}
      if(req.body.options){
        fieldData.options = {options: req.body.options}
      }
      fieldData.order_index = req.body.order_index
      if(req.body.depends_on_value && req.body.id_depends_on_field){
        fieldData.depends_on_value = req.body.depends_on_value
        fieldData.dependsOnField = req.body.id_depends_on_field
      }
      const field = await this.fieldService.create(fieldData)
      res.status(201).json({
        message:"Campo creado correctamente",
        data:field
      })
    } catch (error) {
      res.status(500).json({message:"Error al crear el campo"})
    }
  }
  update = async(req:Request,res:Response)=>{
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
      fieldData.topic = req.body.topicId
      const field = await this.fieldService.update(Number(id),fieldData)
      res.status(200).json({
        message:"Campo actualizado correctamente",
        data:field
      })
    } catch (error) {
      res.status(500).json({message:"Error al actualizar el campo"})
    }
  }
  delete = async(req:Request,res:Response)=>{
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
  findAll = async(req:Request,res:Response)=>{
    try {
      const fields = await this.fieldService.findAll()
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fields
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los campos"})
    }
  }
  findAllByFormId = async(req:Request,res:Response)=>{
    try {
      const {formId} = req.params
      const formService = new FormService()
      const formExits = await formService.findById(Number(formId))
      if(!formExits){
        return res.status(404).json({message:"Formulario no encontrado"})
      }
      const fields = await this.fieldService.findAllByFormId(Number(formId))
      const fieldsFormatted = fields.map((field)=>{
        return {
          id:field.id,
          name:field.key,
          label:field.label,
          type:field.type,
          placeholder:field.placeholder,
          options:field.options ?? undefined,
          validations:field.validations.v,
          order_index:field.order_index,
          id_form:field.form.id,
          id_topic:field.topic?.id ?? undefined,
          active:field.active,
          createdAt:field.createdAt,
        }
      })
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fieldsFormatted
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Error al obtener los campos"})
    }
  }
  findAllByTopicId = async(req:Request,res:Response)=>{
    try {
      const {topicId} = req.params
      const topicService = new TopicService()
      const topicExits = await topicService.findById(Number(topicId))
      if(!topicExits){
        return res.status(404).json({message:"Tema no encontrado"})
      }
      const fields = await this.fieldService.findAllByTopicId(Number(topicId))
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fields
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los campos"})
    }
  }
  validateField = async(req:Request,res:Response)=>{
    try {
      console.log("entro aqui")
      return res.status(200).json({
        message:"Validaciones obtenidas correctamente",
        data:DATA_TYPE_VALIDATION_RULES
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener las validaciones"})
      
    }
  }
}