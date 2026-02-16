import { app } from "./index";
import { AppDataSource } from "@/config/db";

const port = process.env.PORT || 3000;
AppDataSource.initialize().then(()=>{
  console.log('Base De Datos Inicializada')
  app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
  })
}).catch((error)=>{
  console.log(error)
})
