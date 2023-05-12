import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { aluguelSchema } from "../schemas/aluguelSchema.js";
import { getAlugueis, postAlugueis } from "../controllers/alugueisControllers.js";

const aluguel=Router()

aluguel.post("/rentals",validateSchema(aluguelSchema),postAlugueis)
aluguel.get("/rentals",getAlugueis)

export default aluguel