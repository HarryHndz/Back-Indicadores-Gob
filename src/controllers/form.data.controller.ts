import { FormDataService, TFormDataService } from "@/service/form.data.service";
import { Request, Response } from "express";
import { FieldService, TFieldService } from "@/service/field.service";
import { validateFormData } from "@/utils/validation.data";
import { TopicService, TTopicService } from "@/service/topic.service";
import { FormService, TFormService } from "@/service/form.service";

export class FormDataController{
  private formDataService:TFormDataService
  private fieldService:TFieldService
  private topicService:TTopicService
  private formService:TFormService
  constructor(){
    this.formDataService = new FormDataService()
    this.fieldService = new FieldService()
    this.topicService = new TopicService()
    this.formService = new FormService()
  }
  async findAll(req:Request,res:Response){
    try {
      const {formId} = req.query
      if (formId) {
        const formData = await this.formDataService.findByFormId(Number(formId))
        return res.status(200).json({
          message:"FormData por formulario obtenidos correctamente",
          data:formData
        })
      }
      const formData = await this.formDataService.findAll()
      res.status(200).json({
        message:"FormData obtenidos correctamente",
        data:formData
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener los FormData"})
    }
  }
  async findById(req:Request,res:Response){
    try {
      const {id} = req.params
      const formData = await this.formDataService.findById(Number(id))
      if (!formData) {
        return res.status(404).json({message:"FormData no encontrado"})
      }
      res.status(200).json({
        message:"FormData obtenido correctamente",
        data:formData
      })
    } catch (error) {
      res.status(500).json({message:"Error al obtener el FormData"})
    }
  }
  async create(req:Request,res:Response){
    try {
      const formInfo = req.body
      const {formId,inputsData,topicId,isDividedByTopic} = formInfo

      if (!formId) {
        return res.status(400).json({
          message: "El formId es requerido"
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

      const formData = await this.formDataService.create(req.body)
      res.status(201).json({
        message:"FormData creado correctamente",
        data:formData
      })
    } catch (error) {
      console.error("Error al crear el FormData:", error)
      res.status(500).json({message:"Error al crear el FormData"})
    }
  }
  async update(req:Request,res:Response){
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
  async delete(req:Request,res:Response){
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
  async findByTopicId(req:Request,res:Response){
    try {
      const {topicId} = req.query
      const formData = await this.formDataService.findByTopicId(Number(topicId))
      res.status(200).json({
        message:"FormData por topic obtenidos correctamente",
        data:formData
      })
    }
    catch (error) {
      res.status(500).json({message:"Error al obtener el FormData por topic"})
    }
  }
}
