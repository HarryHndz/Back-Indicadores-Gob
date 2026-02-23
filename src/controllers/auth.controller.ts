import { Request, Response } from "express";
import { TUserService,UserService } from "@/service/user.service";
import { comparePassword, generateToken } from "@/utils";

export class AuthController {
  private userService: TUserService;

  constructor() {
    this.userService = new UserService();
  }

  login =async(req: Request, res: Response)=> {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      if (!user.active) {
        return res.status(401).json({ message: "Usuario inactivo" });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = generateToken({ 
        id: user.id, 
        email: user.email, 
        role_name: user.rol.name,
        id_rol: user.rol.id,
        government_name: user.guvernment.name,
        id_government: user.guvernment.id,
      });

      return res.status(200).json({
        message: "Login successful",
        data:{
          token,
          id: user.id,
          name: user.name,
          email: user.email,
          role_name: user.rol.name,
          id_rol: user.rol.id,
          government_name: user.guvernment.name,
          id_government: user.guvernment.id,
        }
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  logout = async(req: Request, res: Response)=> {
    try {
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }    
}