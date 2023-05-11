import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { aluguelSchema } from "../schemas/aluguelSchema.js";
import { postAlugueis } from "../controllers/alugueisControllers.js";

const aluguel=Router()

aluguel.post("/rentals",validateSchema(aluguelSchema),postAlugueis)

export default aluguel