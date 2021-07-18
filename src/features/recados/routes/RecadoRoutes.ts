import { Router } from "express";
import RecadoController from "../controllers/RecadoController";
import descriptionCheck from "../middlewares/descriptionCheck";

export default class RecadoRoutes {
    public init(): Router {
        const routes = Router();
        const controller = new RecadoController;

        routes.post('/recado/:userID', [descriptionCheck], controller.store);
        routes.get('/recado', controller.index);
        routes.get('/recado/:userID', controller.show);
        routes.delete('/recado/:userID/:rid', controller.delete);
        routes.put('/recado/:userID/:rid', [descriptionCheck], controller.update);

        return routes;
    }
}