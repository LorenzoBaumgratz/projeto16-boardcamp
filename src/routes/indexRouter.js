import { Router } from "express";
import jogos from "./jogosRouter.js";
import clientes from "./clientesRouter.js";

const router = Router()

router.use(jogos)
router.use(clientes)

export default router;