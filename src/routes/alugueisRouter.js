import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { aluguelSchema } from "../schemas/aluguelSchema.js";
import { getAlugueis, postAlugueis, postAluguelById } from "../controllers/alugueisControllers.js";

const aluguel = Router()

aluguel.post("/rentals", validateSchema(aluguelSchema), postAlugueis)
aluguel.get("/rentals", getAlugueis)
aluguel.post("/rentals/:id/return",postAluguelById)

export default aluguel