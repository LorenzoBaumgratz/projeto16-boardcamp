import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { getJogos, postJogos } from "../controllers/jogosControllers.js";
import { jogoSchema } from "../schemas/jogoSchema.js";

const jogos = Router()

jogos.post("/games", validateSchema(jogoSchema),postJogos)
jogos.get("/games", getJogos)

export default jogos;