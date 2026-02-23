import 'reflect-metadata';
import { Rol } from "@/entities"
import { RolService } from "@/service/rol.service"
import { AppDataSource } from "@/config/db"

export const generateRol = async()=>{
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize()
    console.log('Base de datos inicializada')

    const rolAdmin = new Rol()
    rolAdmin.name = "admin"
    const rolUser = new Rol()
    rolUser.name = "user"
    const rolService = new RolService()
    const rolAdminCreated = await rolService.create(rolAdmin)
    const rolUserCreated = await rolService.create(rolUser)
    console.log("Rol admin creado:", rolAdminCreated)
    console.log("Rol user creado:", rolUserCreated)
  } catch (error) {
    console.error("Error al crear los roles:", error)
  } finally {
    // Cerrar la conexión al finalizar
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy()
      console.log('Conexión cerrada')
    }
  }
}
(async()=>{
  await generateRol()
})()