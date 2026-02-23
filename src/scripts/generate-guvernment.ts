import 'reflect-metadata';
import {GuvernmentEntity} from "@/entities/GuvernmentEntity"
import { GuvernmentEntityService } from "@/service/guvernment-entity.service"
import { AppDataSource } from "@/config/db"


export const generateGuvernment = async()=>{
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize()
    console.log('Base de datos inicializada')
    const guvernments = [
      { name: 'Salud', description: 'Gestión de licencias sanitarias, expedientes clínicos y programas de vacunación estatal.', },
      { name: 'Educación', description: 'Administración de becas, registro escolar y certificados de validación académica.', },
      { name: 'Finanzas', description: 'Recaudación de impuestos, transparencia presupuestaria y trámites de proveedores.', },
      { name: 'Movilidad', description: 'Licencias de conducir, registro vehicular y multas de tránsito.', },
      { name: 'Medio Ambiente', description: 'Verificación vehicular, permisos de impacto ambiental y áreas naturales protegidas.', },
      { name: 'Cultura', description: 'Programas de apoyo comunitario, registro de asociaciones y padrón de beneficiarios.', },
      { name: 'Anticorrupción', description: 'Reportes ciudadanos, trámites de protección civil y permisos de seguridad institucional.', },
      { name: 'Gobierno', description: 'Gestión de la participación ciudadana, vinculación laboral y defenza del prueblo.', },
      { name: 'Bienestar', description: 'Gestión de programas, sembrando vida y pensiones para adultos mayores', },
      { name:'Desarrollo Agropecuario', description:'Control integral de la producción agropecuaria, estatus sanitario estatal y tecnificación del campo.', },
      { name:'Turismo', description:'Análisis de indicadores turísticos y nutricionales, impulso al emprendimiento femenino, fortalecimiento de la cadena del cacao y gestión de eventos.', },
      { name:'Obras Públicas', description:'Gestión de infraestructura educativa, magnas obras civiles, rehabilitación urbana, conectividad vial y cobertura de servicios básicos estatales', },
      { name:'Gubernatura', description:'Gestión de correos institucionales, asesorias y peticiones en atención al ciudadano.', },
      { name: 'Consejeria Juridica',description:'Asesoría jurídica, análisis normativo y representación legal del Gobierno del Estado.', },
      { name:'Injudet',description:'Promoción del deporte y la recreación en el estado, gestión de instalaciones deportivas y organización de eventos deportivos.', },
      { name:'Seguridad',description:'Monitoreo de indicadores de seguridad pública y prevención de desastres.', }
    ]
    const guvernmentService = new GuvernmentEntityService()

    for (const guvernment of guvernments) {
      const guvernmentEntity = new GuvernmentEntity()
      guvernmentEntity.name = guvernment.name
      guvernmentEntity.description = guvernment.description
      guvernmentEntity.active = true
      guvernmentEntity.isHaveSubGubernment = false
      
      await guvernmentService.create(guvernmentEntity)
    }
    console.log("Guvernments creados correctamente")
  } catch (error) {
    console.error("Error al crear el guvernment:", error)
  } finally {
    // Cerrar la conexión al finalizar
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy()
      console.log('Conexión cerrada')
    }
  }
}

(async()=>{
  await generateGuvernment()
})()