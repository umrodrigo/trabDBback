import { NextFunction, Request, Response } from 'express';


export default async function descriptionCheck(
    req: Request, 
    res: Response,
    next: NextFunction
    ) {
        const { descricao }: { descricao: string } = req.body;
        if (!descricao) {
            return res.status(400).json({
              msg: "A descrição não pode estar em branco",
            });
        }
        next();
    }