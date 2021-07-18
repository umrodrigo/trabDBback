import { Request, Response } from 'express';
import { User } from '../../../core/data/database/entities/User';
import { UserTip } from '../models/userModel';

export default class UserController {
    // Criar novo Usuário
    public async store(req: Request, res: Response) {
        const { username, password }: UserTip = req.body;
        try {
            const user = await new User(username, password).save();
            return res.status(201).json(user);
        } catch(error) {
            return res.status(500).json(error);
        };
    }
    public async login(req: Request, res: Response) {
        const { username, password }: UserTip  = req.body;
        try {
            let userExist = await User.findOne({
                where: {
                  username: username,
                  password: password
                },
              });
              if (!userExist) {      
                  return res.status(400).json({
                    msg: "Usuário/Senha inválidos, tente novamente.",
                  });
                };
            console.log('fez login', userExist);
            return res.status(201).json(userExist);
        } catch(error) {
            return res.status(500).json(error);
        };
    }
    // Mostrar todos os usuarios
    public async index(req: Request, res: Response) {
        const users = await User.find();
        return res.json(users);
    }
    // Atualiza a senha - Nome de usuário não pode ser alterado
    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { password }: UserTip = req.body;
        const user = await User.findOne(id);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado',
            });
        };
        const result = await User.update(id, { 
            password
        });
        return res.json(result);
    }
    // Deletar usuário/ em cascata recados..
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne(id);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado',
            });
        };
        const result = await User.delete(id);
        return res
            .status(200)
            .json((result.affected as number)
            > 0 ? 'Usuário excluido': 'Não foi possível deletar usuário'
        );
    }
    // Exibe usuario
    public async show(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findOne(id);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado',
            });
        };
        return res.json(user);
    }
}