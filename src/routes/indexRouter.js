import { Router } from "express";
import jogos from "./jogosRouter.js";
import clientes from "./clientesRouter.js";
import aluguel from "./alugueisRouter.js";

const router = Router()

router.use(jogos)
router.use(clientes)
router.use(aluguel)

export default router;