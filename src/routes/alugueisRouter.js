import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { aluguelSchema } from "../schemas/aluguelSchema.js";
import { deleteAluguelById, getAlugueis, postAlugueis, postAluguelById } from "../controllers/alugueisControllers.js";

const aluguel = Router()

aluguel.post("/rentals", validateSchema(aluguelSchema), postAlugueis)
aluguel.get("/rentals", getAlugueis)
aluguel.post("/rentals/:id/return",postAluguelById)
aluguel.delete("/rentals/:id",deleteAluguelById)
export default aluguel