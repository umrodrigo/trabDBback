import { Router } from "express";
import UserController from "../controllers/UserController";
import passwordCheck from "../middlewares/passwordCheck";
import userCheck from "../middlewares/userCheck";

export default class UserRoutes {
    public init(): Router{
        const routes = Router();
        const controller = new UserController;

        routes.post('/user', [userCheck, passwordCheck], controller.store);
        routes.get('/user', controller.index);
        routes.get('/user/:id', controller.show);
        routes.delete('/user/:id', controller.delete);
        routes.put('/user/:id', [passwordCheck], controller.update);

        return routes;
    }

}