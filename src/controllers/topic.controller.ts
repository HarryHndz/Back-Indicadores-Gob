import { TopicService, TTopicService } from "@/service/topic.service";
import { Request, Response } from "express";

export class TopicController{
  private topicService:TTopicService
  constructor(){
    this.topicService = new TopicService()
  }
  async findAll(req:Request,res:Response){
    try {
      const governmentEntityId = req.query.governmentEntityId as string
      if (governmentEntityId) {
        const topics = await this.topicService.findAllByGovernmentEntityId(Number(governmentEntityId))
        return res.status(200).json({
          message:"Temas encontrados correctamente",
          data:topics
        })
      }
      const topics = await this.topicService.findAll()
      return res.status(200).json({
        message:"Temas encontrados correctamente",
        data:topics
      })
    } catch (error) {
      return res.status(500).json({
        message:"Error al encontrar los temas",
        error:error
      })
    }
  }
  async findById(req:Request,res:Response){
    try {
      const {id} = req.params

      const topic = await this.topicService.findById(Number(id))
      if(!topic){
        return res.status(404).json({
          message:"Tema no encontrado"
        })
      }
      return res.status(200).json({
        message:"Tema encontrado correctamente",
        data:topic
      })
    } catch (error) {
      return res.status(500).json({
        message:"Error al encontrar el tema",
        error:error
      })
    }
  }
  async create(req:Request,res:Response){
    try {
      const topicData = req.body
      const topic = await this.topicService.create(topicData)
      return res.status(201).json({
        message:"Tema creado correctamente",
        data:topic
      })
    } catch (error) {
      return res.status(500).json({
        message:"Error al crear el tema",
        error:error
      })
    }
  }
  async update(req:Request,res:Response){
    try {
      const {id} = req.params
      const topicData = req.body
      const topicExist = await this.topicService.findById(Number(id))
      if(!topicExist){
        return res.status(404).json({
          message:"Tema no encontrado"
        })
      }
      const topic = await this.topicService.update(Number(id),topicData)
      return res.status(200).json({
        message:"Tema actualizado correctamente",
        data:topic
      })
    } catch (error) {
      return res.status(500).json({
        message:"Error al actualizar el tema",
        error:error
      })
    }
  }
  async delete(req:Request,res:Response){
    try {
      const {id} = req.params
      const topicExist = await this.topicService.findById(Number(id))
      if(!topicExist){
        return res.status(404).json({
          message:"Tema no encontrado"
        })
      }
      const topic = await this.topicService.delete(Number(id))
      return res.status(200).json({
        message:"Tema eliminado correctamente",
        data:topic
      })
    } catch (error) {
      return res.status(500).json({
        message:"Error al eliminar el tema",
        error:error
      })
    }
  }
}