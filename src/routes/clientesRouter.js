import { Router } from "express";
import { getCliente, getClienteById, postCliente, putClienteById } from "../controllers/clientesControllers.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { clienteSchema } from "../schemas/clienteSchema.js";

const clientes=Router()

clientes.get("/customers",getCliente)
clientes.get("/customers/:id",getClienteById)
clientes.put("/customers/:id",validateSchema(clienteSchema),putClienteById)
clientes.post("/customers",validateSchema(clienteSchema),postCliente)

export default clientes