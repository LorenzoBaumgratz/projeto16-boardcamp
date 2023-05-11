import { Router } from "express";
import jogos from "./jogosRouter.js";

const router = Router()

router.use(jogos)

export default router;