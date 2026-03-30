import { FieldService, TFieldService } from '@/service/field.service'
import { FormDataService, TFormDataService } from '@/service/form.data.service'
import { FormService, TFormService } from '@/service/form.service'
import { TopicService, TTopicService } from '@/service/topic.service'
import {Request,Response} from 'express'

export class IndicatorsController{
  private formService:TFormService
  private topicService:TTopicService
  private formDataService:TFormDataService
  private fieldService:TFieldService
  constructor(){
    this.formService = new FormService()
    this.topicService = new TopicService()
    this.formDataService = new FormDataService()
    this.fieldService = new FieldService()
  }
  
  securityIndicators =async (req:Request,res:Response)=>{

  }

  economicIndicators =async (req:Request,res:Response)=>{

  }

  governmentIndicators =async (req:Request,res:Response)=>{

  }

  tourimsIndicators =async (req:Request) => {
    
  }

}