import { Router } from "express";
import RecadoController from "../controllers/RecadoController";

export default class RecadoRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new RecadoController;

        routes.post('/recado/:userID', controller.store);
        routes.get('/recado', controller.index);
        routes.get('/recado/:userID', controller.show);
        routes.delete('/recado/:userID/:rid', controller.delete);
        routes.put('/recado/:userID/:rid', controller.update);

        return routes;
    }
}