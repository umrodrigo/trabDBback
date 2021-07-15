import express from "express";
import cors from "cors";

import Database from "./core/data/connections/Database";
import UserRoutes from "./features/user/routes/UserRoutes";
import RecadoRoutes from "./features/recados/routes/RecadoRoutes";


const app = express();
// Receber json no corpo da Requisição
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Vincular as rotas
//const autorRoutes = new AutorRoutes().init();
const userRoutes = new UserRoutes().init();
const recadoRoutes = new RecadoRoutes().init();

app.use(userRoutes, recadoRoutes);

const init = async () => {
  await new Database().openConnection();
  app.listen(process.env.PORT || 3001, () => {
    console.log("Rodando");
  });
};

init();
