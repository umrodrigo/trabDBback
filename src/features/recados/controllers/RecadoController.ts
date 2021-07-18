import { Request, Response } from 'express';
import { Recado } from '../../../core/data/database/entities/Recado';
import { User } from '../../../core/data/database/entities/User';

export default class RecadoController {
    // Criar novo Recado
    public async store(req: Request, res: Response) {
        const { userID } = req.params;
        const { descricao, detalhamento } = req.body;
        try {
            const user = await User.findOne(userID);
            if (!user) {
                return res.status(404).json({
                    msg: 'Usuário não encontrado',
                });
            } else {
                const recado = await new Recado(descricao, detalhamento, userID).save();
                return res.status(201).json(recado);
            }
        } catch(error) {
            return res.status(500).json(error);
        };
    }
    // Mostrar todos os recados de todos os usuarios
    public async index(req: Request, res: Response) {
        const recado = await Recado.find();
        return res.json(recado);
    }
    // Atualiza descrição e detalhamento
    public async update(req: Request, res: Response) {
        const { userID, rid } = req.params;
        const { descricao, detalhamento } = req.body;
        try {
            const user = await User.findOne(userID);
            if (!user) {
                return res.status(404).json({
                    msg: 'Usuário não encontrado',
                });
            };
            const result = await Recado.update(rid, { 
                descricao, detalhamento
            });
            return res.json(result);
        } catch(error) {
            return res.status(500).json(error);
        };
    }
    // Deletar recados
    public async delete(req: Request, res: Response) {
        const { userID, rid } = req.params;
        const user = await User.findOne(userID);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado',
            });
        };
        const result = await Recado.delete(rid);
        return res
            .status(200)
            .json((result.affected as number)
            > 0 ? 'Recado excluido': 'Não foi possível deletar o recado'
        );
    }
    // Exibe todos os recados de um usuário
    public async show(req: Request, res: Response) {
        const { userID } = req.params;
        const user = await User.findOne(userID);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado',
            });
        };        
        const recadosUsuario = await Recado.find({
            where: {
                userID: userID,
            },
        });
        console.log(recadosUsuario);
        return res.json(recadosUsuario);
    }
}