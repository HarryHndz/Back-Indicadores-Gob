import 'reflect-metadata'
import { GuvernmentEntityService } from '@/service/guvernment-entity.service'
import { FormService } from '@/service/form.service'
import { FieldService } from '@/service/field.service'
import { TopicService } from '@/service/topic.service'
import { AppDataSource } from '@/config/db'


export const lowerCaseGuvernmentData = async () => {
  try {
    const guvernmentService = new GuvernmentEntityService()
    const guvernments = await guvernmentService.findAll()
    for (const guvernment of guvernments) {
      guvernment.name = guvernment.name.toLowerCase()
      await guvernmentService.update(guvernment.id, guvernment)
    }
    console.log("Datos de guvernments actualizados a minúsculas")
  } catch (error) {
    console.error("Error al actualizar los datos de guvernments:", error)
  }
}

export const lowerCaseForm = async()=>{
  try {
    const formService = new FormService()
    const data = await formService.findAll()
    for (const form of data) {
      form.name = form.name.toLowerCase()
      await formService.update(form.id,form)
    }
    console.log("Datos de formularios actualizados a minúsculas")
  } catch (error) {
    console.error("Error al actualizar los datos de formularios:", error)
  }
}

export const lowerCaseDataField = async()=>{
  try {
    const fieldService = new FieldService()
    const data = await fieldService.findAll()
    for (const field of data) {
      field.key = field.key.toLowerCase()
      field.label = field.label.toLowerCase()
      await fieldService.update(field.id,field)
    }
    console.log("Datos de campos actualizados a minúsculas")
  } catch (error) {
    console.error("Error al actualizar los datos de campos de formulario:", error)
  }
}

export const lowerCaseDataTopic = async()=>{
  try {
    const topicService = new TopicService()
    const data = await topicService.findAll()
    for (const topic of data) {
      topic.name = topic.name.toLowerCase()
      await topicService.update(topic.id,topic)
    }
    console.log("Datos de temas actualizados a minúsculas")
  } catch (error) {
    console.error("Error al actualizar los datos de temas:", error)
  }
}

(async()=>{
  await AppDataSource.initialize()
  console.log('Base de datos inicializada')
  await Promise.all([
    lowerCaseGuvernmentData(),
    lowerCaseForm(),
    lowerCaseDataField(),
    lowerCaseDataTopic()
  ]).catch((error)=>{
     console.log("error general",error)
  }).finally(async ()=>{
      console.log("Proceso de actualización de datos completado")
      await AppDataSource.destroy()
      console.log('Conexión cerrada')
  })
})()