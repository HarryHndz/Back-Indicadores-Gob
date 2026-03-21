import { FormDataService, TFormDataService } from "@/service/form.data.service";
import { Request, Response } from "express";
import { FieldService, TFieldService } from "@/service/field.service";
import { validateFormData } from "@/utils/validation.data";
import { TopicService, TTopicService } from "@/service/topic.service";
import { FormService, TFormService } from "@/service/form.service";
import { GuvernmentEntityService, TGuvernmentEntityService } from "@/service/guvernment-entity.service";
import { FormData, Topic } from "@/entities";
import { TUserService, UserService } from "@/service/user.service";
import { calculateSkip, calculateTotalPages, TAKE } from "@/utils/pagination";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

export class FormDataController{
  private formDataService:TFormDataService
  private fieldService:TFieldService
  private topicService:TTopicService
  private formService:TFormService
  private guvernmentService:TGuvernmentEntityService
  private userService:TUserService

  constructor(){
    this.formDataService = new FormDataService()
    this.fieldService = new FieldService()
    this.topicService = new TopicService()
    this.formService = new FormService()
    this.guvernmentService = new GuvernmentEntityService()
    this.userService = new UserService()
  }

  findAll = async(req:Request,res:Response)=>{
    try {
      const {page} = req.query
      const skip = calculateSkip(Number(page || 1))
      const formData = await this.formDataService.findAll(skip)
      const formDataFormatted = formData.map((data)=>{
        return {
          id:data.id,
          data:data.data,
          id_topic: data.topic?.id ?? undefined,
          edit:data.edit,
          active:data.active,
          created_at:data.createdAt,
          id_form:data.form.id,
          id_user:data.user.id,
          username:data.user.name,
          form_name:capitalizeLetter(data.form.name),
          topic_name:data.topic?.name ? data.topic.name.toUpperCase() : undefined,
        }
      })
      return res.status(200).json({
        message:"FormData obtenidos correctamente",
        data:formDataFormatted
      })
    } catch (error) {
      console.error("Error al obtener los FormData:", error)
      res.status(500).json({message:"Error al obtener los FormData"})
    }
  }
  
  findAllByFormId = async(req:Request,res:Response)=>{
    const id = req.params.id
    const form_exist = await this.formService.findById(Number(id))
    if(!form_exist){
      return res.status(404).json({message:"Formulario no encontrado"})
    }
    const {page,search} = req.query
    const searchValue = search ? String(search) : undefined
    const skip = calculateSkip(Number(page || 1))
    const formData = await this.formDataService.findByFormId(form_exist.id,skip,searchValue)
    const formDataFormatted = formData.map((data)=>{ 
      return {
        id:data.id,
        data:data.data,
        id_topic: data.topic?.id ?? undefined,
        edit:data.edit,
        active:data.active,
        created_at:data.createdAt,
        id_form:data.form.id,
        form_name:capitalizeLetter(data.form.name),
        topic_name:data.topic?.name ? data.topic.name.toUpperCase(): undefined,
        id_user:data.user.id,
        username:capitalizeLetter(data.user.name),
      }
    })
    return res.status(200).json({
      message:"FormData por formulario obtenidos correctamente",
      data:formDataFormatted
    })
  }

  findAllByGuvernment = async(req:Request,res:Response)=>{
    try{
      const id = req.params.id
      const guvernment_exist = await this.guvernmentService.findById(Number(id))
      if(!guvernment_exist){
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      const {page} = req.query
      const skip = calculateSkip(Number(page || 1))
      const form_data = await this.formDataService.findByGuvernmentId(guvernment_exist.id,skip)
      const form_data_formatted = form_data.map((data)=>{
        return {
          id:data.id,
          data:data.data,
          id_topic: data.topic?.id ?? undefined,
          edit:data.edit,
          active:data.active,
          created_at:data.createdAt,
          id_form:data.form.id,
          form_name:capitalizeLetter(data.form.name),
          topic_name:data.topic?.name ? data.topic.name.toUpperCase() : undefined,
          id_user:data.user.id,
          username:capitalizeLetter(data.user.name),
        }
      })
      return res.status(200).json({
        message:"FormData obtenidos correctamente",
        data:form_data_formatted
      })
    }catch(error){
      console.error("Error al obtener los FormData:", error)
      return res.status(500).json({message:"Error al obtener los FormData"})
    }
  }

  findById = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const formData = await this.formDataService.findById(Number(id))
      if (!formData) {
        return res.status(404).json({message:"FormData no encontrado"})
      }
      const formDataFormatted = {
        id:formData.id,
        data:formData.data,
        id_topic: formData.topic?.id ?? undefined,
        edit:formData.edit,
        active:formData.active,
        createdAt:formData.createdAt,
        updatedAt:formData.updatedAt,
        id_form:formData.form.id,
        id_user:formData.user.id,
        user_name:capitalizeLetter(formData.user.name),
      }
      return res.status(200).json({
        message:"FormData obtenido correctamente",
        data:formDataFormatted
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el FormData"})
    }
  }

  create = async(req:Request,res:Response)=>{
    try {
      const formInfo = req.body
      const {formId,inputsData,topicId,isDividedByTopic,userId} = formInfo
      let topic:Topic | null = null
      if (!formId || !userId) {
        return res.status(400).json({
          message: "El formId y userId son requeridos"
        })
      }
      const user = await this.userService.findById(Number(userId))
      if (!user) {
        return res.status(404).json({message:"Usuario no encontrado"})
      }

      if (!inputsData || !Array.isArray(inputsData) || inputsData.length === 0) {
        return res.status(400).json({
          message: "Los datos de entrada deben seguir el formato proporcionado"
        })
      }
      const formExist = await this.formService.findById(Number(formId))
      if (!formExist) {
        return res.status(404).json({message:"Formulario no encontrado"})
      }


      if (Number(isDividedByTopic) === 1) {
        if (!topicId) {
          return res.status(400).json({
            message: "El Tema es requerido"
          })
        }
         topic = await this.topicService.findById(Number(topicId))
        if (!topic ) {
          return res.status(404).json({message:"Topic no encontrado"})
        }
        if (!formExist.topic.find(t=>t.id === topic?.id)) {
          return res.status(400).json({
            message: "El Tema no pertenece al Formulario"
          })
        }

        const fields = await this.fieldService.findAllByTopicId(topic.id)
        if (fields.length === 0) {
          return res.status(404).json({message:"Tema no tiene campos"})
        }
        
        const validationResult = validateFormData(fields, inputsData)
        if (!validationResult.isValid) {
          return res.status(400).json({
            message: "Error de validación en los datos del formulario",
            errors: validationResult.errors
          })
        }

      }else{
        const fields = await this.fieldService.findAllByFormId(Number(formId))
        if (fields.length === 0) {
          return res.status(404).json({message:"Formulario no tiene campos"})
        }
  
        const validationResult = validateFormData(fields, inputsData)
        if (!validationResult.isValid) {
          return res.status(400).json({
            message: "Error de validación en los datos del formulario",
            errors: validationResult.errors
          })
        }
      }
      const form = new FormData()
      form.data = inputsData
      form.edit = false
      form.form = formExist
      form.user = user
      if (Number(isDividedByTopic) === 1 && topicId) {
        form.topic = topic
      }
      
      const form_created = await this.formDataService.create(form)
      res.status(201).json({
        message:"FormData creado correctamente",
        data:form_created
      })
    } catch (error) {
      console.error("Error al crear el FormData:", error)
      res.status(500).json({message:"Error al crear el FormData"})
    }
  }

  update = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const formInfo = req.body
      const {formId,inputsData,topicId,isDividedByTopic} = formInfo
      const formDataExist = await this.formDataService.findById(Number(id))

      if (!formDataExist) {
        return res.status(404).json({message:"FormData no encontrado"})
      }

      if (formDataExist.edit === false) {
        return res.status(400).json({
          message: "No se puede editar la información porque no tiene permisos"
        })
      }

      if (!inputsData || !Array.isArray(inputsData) || inputsData.length === 0) {
        return res.status(400).json({
          message: "Los datos de entrada deben seguir el formato proporcionado"
        })
      }
      const formExist = await this.formService.findById(Number(formId))
      if (!formExist) {
        return res.status(404).json({message:"Formulario no encontrado"})
      }

      if (Number(isDividedByTopic) === 1) {
        if (!topicId) {
          return res.status(400).json({
            message: "El Tema es requerido"
          })
        }

        const topic = await this.topicService.findById(Number(topicId))
        if (!topic) {
          return res.status(404).json({message:"Topic no encontrado"})
        }
        if (formExist.topic.find(t=>t.id !== topic.id)) {
          return res.status(400).json({
            message: "El Tema no pertenece al Formulario"
          })
        }

        const fields = await this.fieldService.findAllByTopicId(topic.id)
        if (fields.length === 0) {
          return res.status(404).json({message:"Tema no tiene campos"})
        }
        
        const validationResult = validateFormData(fields, inputsData)
        if (!validationResult.isValid) {
          return res.status(400).json({
            message: "Error de validación en los datos del formulario",
            errors: validationResult.errors
          })
        }

      }else{
        const fields = await this.fieldService.findAllByFormId(Number(formId))
        if (fields.length === 0) {
          return res.status(404).json({message:"Formulario no tiene campos"})
        }
  
        const validationResult = validateFormData(fields, inputsData)
        if (!validationResult.isValid) {
          return res.status(400).json({
            message: "Error de validación en los datos del formulario",
            errors: validationResult.errors
          })
        }
      }
      const formDataUpdated = await this.formDataService.update(formDataExist.id,formInfo)

      return res.status(200).json({
        message:"Información  actualizada correctamente",
        data:formDataUpdated
      })

    } catch (error) {
      res.status(500).json({message:"Error al actualizar el FormData"})
    }
  }

  delete = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const formData = await this.formDataService.findById(Number(id))
      if (!formData) {
        return res.status(404).json({message:"FormData no encontrado"})
      }
      await this.formDataService.delete(Number(id))
      res.status(200).json({
        message:"FormData eliminado correctamente",
      })
    } catch (error) {
      res.status(500).json({message:"Error al eliminar el FormData"})
    }
  }

  findAllByTopicId = async(req:Request,res:Response)=>{
    try {
      const topicId = req.params.topicId
      const topic_exist = await this.topicService.findById(Number(topicId))
      if(!topic_exist){
        return res.status(404).json({message:"Tema no encontrado"})
      }
      const {page} = req.query
      const skip = calculateSkip(Number(page || 1))
      const formData = await this.formDataService.findByTopicId(Number(topicId),skip)
      const formDataFormatted = formData.map((data)=>{
        return {
          id:data.id,
          data:data.data,
          id_topic: data.topic?.id ?? undefined,
          edit:data.edit,
          active:data.active,
          created_at:data.createdAt,
          id_form:data.form.id,
          form_name:capitalizeLetter(data.form.name),
          topic_name:data.topic?.name ? data.topic.name.toUpperCase() : undefined,
          id_user:data.user.id,
          username:capitalizeLetter(data.user.name),
        }
      })
      return res.status(200).json({
        message:"FormData por topic obtenidos correctamente",
        data:formDataFormatted
      })
    } catch (error) {
      console.error("Error al obtener el FormData por topic:", error)
      res.status(500).json({message:"Error al obtener el FormData por topic"})
    }
  }
  
  findAllByGuvernmentIdWithTopics = async (req:Request,res:Response)=>{
    try {
      const {id_guvernment,page} = req.query
      const guvernmentExits = await this.guvernmentService.findById(Number(id_guvernment))
      if(!guvernmentExits){
        return res.status(404).json({message:"Entidad gubernamental no encontrada"})
      }
      const skip = calculateSkip(Number(page || 1))
      const forms = await this.formService.findAllByGuvernmentIdWithTopics(Number(id_guvernment),skip)
      const formsFormatted = forms.map((form)=>{
        return {
          id: form.id,
          name: form.name,
          description: form.description,
          active: form.active,
          id_guvernment: form.guvernment.id,
          gubernment_name: capitalizeLetter(form.guvernment.name),
          created_at: form.createdAt,
          topics:form.topic.map((topic)=>{
            return {
              id:topic?.id,
              name:topic?.name ? topic.name.toUpperCase() : undefined,
              id_form:form.id,
              form_name:capitalizeLetter(form.name),
              year_fiscal:topic?.yearFiscal ?? undefined,
              createdAt:topic?.createdAt,
              update_period:topic?.update_period ?? undefined,
            }
          })
        }
      })
      return res.status(200).json({
        message:"Formularios con temas obtenidos correctamente",
        data:formsFormatted
      })
    } catch (error) {
      console.error("Error al obtener los formularios con temas:", error)
      res.status(500).json({message:"Error al obtener los formularios con temas"})
    }
  }

  findFormByIdWithFields = async(req:Request,res:Response)=>{
    try {
      const {id} = req.params
      const form = await this.formService.findById(Number(id))
      if(!form){
        return res.status(404).json({message:"Formulario no encontrado"})
      }
      const fields = await this.fieldService.findAllByFormId(Number(id))
      const fieldsFormatted = fields.map((field)=>{
        return {
          id:field.id,
          name:capitalizeLetter(field.key),
          label:capitalizeLetter(field.label),
          type:field.type,
          placeholder:field.placeholder,
          options:field.options?.options ?? undefined,
          validations:field.validations?.v ?? undefined,
          id_form:field.form.id,
          active:field.active,
          createdAt:field.createdAt,
        }
      })
      return res.status(200).json({
        message:"Formulario con campos obtenido correctamente",
        data:fieldsFormatted
      })
    } catch (error) {
      console.error("Error al obtener el formulario con campos:", error)
      res.status(500).json({message:"Error al obtener el formulario con campos"})
    }
  }

  findFormByTopicIdWithFields = async(req:Request,res:Response)=>{
    try {
      const {topicId} = req.params
      const topic = await this.topicService.findById(Number(topicId))
      if(!topic){
        return res.status(404).json({message:"Tema no encontrado"})
      }

      const fields = await this.fieldService.findAllByTopicId(Number(topicId))
      const fieldsFormatted = fields.map((field)=>{
        return {
          id:field.id,
          name:capitalizeLetter(field.key),
          label:capitalizeLetter(field.label),
          type:field.type,
          placeholder:field.placeholder,
          options:field.options?.options ?? undefined,
          validations:field.validations?.v ?? undefined,
          id_form:field.form.id,
          id_topic:field.topic?.id ?? undefined,
          active:field.active,
          createdAt:field.createdAt,
        }
      })
      return res.status(200).json({
        message:"Formulario con campos obtenido correctamente",
        data:fieldsFormatted
      })
    } catch (error) {
      console.error("Error al obtener el formulario con campos por topic:", error)
      res.status(500).json({message:"Error al obtener el formulario con campos por topic"})
    }
  }

  totalRegister = async(req:Request,res:Response)=>{
    try {
      const {formId,topicId,search} = req.query
      const searchValue = search ? String(search): undefined
      let totalFormData:number
      if(formId){
        totalFormData = await this.formDataService.totalRegisterByFormId(Number(formId),searchValue)
      }else if(topicId){
        totalFormData = await this.formDataService.totalRegisterByTopicId(Number(topicId),searchValue)
      }else{
        totalFormData = await this.formDataService.totalRegister(searchValue)
      }
      const totalPages = calculateTotalPages(totalFormData)
      return res.status(200).json({
        message:"Total de FormData encontrados correctamente",
        data:{
          total_pages:totalPages,
          total_items:totalFormData,
          items_per_page: totalFormData > TAKE ? TAKE : totalFormData,
        }
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el total de FormData"})
    }
  }
}
