import { FieldService, TFieldService } from "@/service/field.service";
import { Request, Response } from "express";
import { Field } from "@/entities/index";
import { FormService } from "@/service/form.service";
import { TopicService } from "@/service/topic.service";
import { DATA_TYPE_VALIDATION_RULES } from "@/utils/validation.rules";
import { municipios } from "@/utils/municipios";
import { calculateSkip, calculateTotalPages, TAKE } from "@/utils/pagination";
import { capitalizeLetter } from "@/utils/capitalizeLetter";


export class FieldController{
  private fieldService:TFieldService
  constructor(){
    this.fieldService = new FieldService()
  }

  findById =async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const field = await this.fieldService.findById(Number(id))
      if (!field) {
        return res.status(404).json({
          message:"Campo no encontrado"
        })
      }

      const fieldFormatted: Field = {
        ...field,
        key:capitalizeLetter(field.key),
        label:capitalizeLetter(field.label)
      }
      res.status(200).json({
        message:"Campo obtenido correctamente",
        data:fieldFormatted
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el campo"})
    }
  }
  
  create = async(req:Request,res:Response)=>{
    try {
      const fieldData = new Field()
      fieldData.key = req.body.name.toLowerCase()
      fieldData.label = req.body.label
      fieldData.placeholder = req.body.placeholder
      fieldData.type = req.body.type
      fieldData.form = req.body.id_form
      fieldData.topic = req.body.id_topic
      fieldData.validations = {v: req.body.validations}
      if(req.body.options){
        if(req.body.municipality_options){
          fieldData.options = {
            options: municipios.map((municipio)=>({label:municipio.name,value:municipio.id}))
          }
        }else{
          fieldData.options = {options: req.body.options}
        }
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
      fieldData.key = req.body.key.toLowerCase()
      fieldData.label = req.body.label.toLowerCase()
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
      const {page} = req.query
      const skip = calculateSkip(Number(page || 1))
      const fields = await this.fieldService.findAll(skip)
      const fieldsFormatted = fields.map((field)=>{
        return {
          id:field.id,
          name:capitalizeLetter(field.key),
          label:capitalizeLetter(field.label),
          name_topic:field.topic?.name ?? undefined,
          type:field.type,
          placeholder:field.placeholder,
          options:field.options ?? undefined,
          validations:field.validations.v,
          order_index:field.order_index,
          id_form:field.form.id,
          id_topic:field.topic?.id ?? undefined,
          active:field.active,
          createdAt:field.createdAt,
          form_name:field.form.name,
          topic_name:field.topic?.name.toUpperCase() ?? undefined,
        }
      })
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fieldsFormatted 
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
      const page = Number(req.query.page || 1)
      const search = req.query.search  ? String(req.query.search) : undefined
      const skip = calculateSkip(page)
      const fields = await this.fieldService.findAllByFormId(Number(formId),skip,search)
      const fieldsFormatted = fields.map((field)=>{
        return {
          id:field.id,
          name:capitalizeLetter(field.key),
          label:capitalizeLetter(field.label),
          name_topic:field.topic?.name ?? undefined,
          type:field.type,
          placeholder:field.placeholder,
          options:field.options ?? undefined,
          validations:field.validations.v,
          order_index:field.order_index,
          id_form:field.form.id,
          id_topic:field.topic?.id ?? undefined,
          active:field.active,
          createdAt:field.createdAt,
          form_name:field.form.name,
          topic_name:field.topic?.name ?? undefined,
        }
      })
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:{
          fields:fieldsFormatted,
          total:fields.length,
          form_name:formExits.name,
          guvernment_name:capitalizeLetter(formExits.guvernment.name),
          id_guvernment:formExits.guvernment.id,
        }
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
      // const page = Number(req.query.page || 1)
      // const skip = calculateSkip(page)
      const fields = await this.fieldService.findAllByTopicId(Number(topicId))
      const fieldsFormatted = fields.map((field)=>({
        ...field,
        key:capitalizeLetter(field.key),
        label: capitalizeLetter(field.label)
      }))
      res.status(200).json({
        message:"Campos obtenidos correctamente",
        data:fieldsFormatted
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los campos"})
    }
  }

  validateField = async(req:Request,res:Response)=>{
    try {
      return res.status(200).json({
        message:"Validaciones obtenidas correctamente",
        data:DATA_TYPE_VALIDATION_RULES
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener las validaciones"})
      
    }
  }
  
  findAllMunicipios = async(req:Request,res:Response)=>{
    try {
      return res.status(200).json({
        message:"Municipios obtenidos correctamente",
        data:municipios
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los municipios"})
    }
  }

  totalRegister = async(req:Request,res:Response)=>{
    try {
      const {formId,topicId,search}  = req.query
      const searchParam = search ? String(search) : undefined
      let totalFields:number
      if(formId){
        totalFields = await this.fieldService.totalRegisterByFormId(Number(formId),searchParam)
      }else if(topicId){
        totalFields = await this.fieldService.totalRegisterByTopicId(Number(topicId),searchParam)
      }else{
        totalFields = await this.fieldService.totalRegister(searchParam)
      }
      const totalPages = calculateTotalPages(totalFields)
      return res.status(200).json({
        message:"Total de campos encontrados correctamente",
        data:{
          total_pages:totalPages,
          total_items:totalFields,
          items_per_page: totalFields > TAKE ? TAKE : totalFields,
        }
      })
    }catch(error){
      res.status(500).json({message:"Error al obtener el total de campos"})
    }
  }
}