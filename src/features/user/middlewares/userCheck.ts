import { Request, Response, NextFunction } from "express";
import { User } from "../../../core/data/database/entities/User";
import { UserTip } from "../models/userModel";

export default async function userCheck(req: Request, res: Response, next: NextFunction) {
    const { username }: UserTip  = req.body;    
    let userExist = await User.findOne({
      where: {
        username: username,
      },
    });
    if (userExist) {      
         return res.status(400).json({
           msg: "Usuário já existe, tente novamente.",
         });
       };
    if (!username) {
      return res.status(400).json({
          msg: "Usuário deve ser informado.",
      });
    };    
    if (username.trim().length <= 3) {
      return res.status(400).json({
         msg: "Usuário deve conter ao menos 3 caracteres.",
      });
    };
    next();
    }