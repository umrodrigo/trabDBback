import { NextFunction, Request, Response } from 'express';


export default async function passwordCheck(
    req: Request, 
    res: Response,
    next: NextFunction
    ) {
        const { password, password2 } = req.body;
        if (!password) {
            return res.status(400).json({
              msg: "A senha deve ser informada",
            });
          }
        if (password.trim().length < 4) {
          return res.status(400).json({
            msg: "A senha deve conter ao menos 4 caracteres",
          });
        }
        if (password !== password2) {
          return res.status(400).json({
              msg: 'As senhas não coincidem, tente novamente'})
        }
        next();
    }