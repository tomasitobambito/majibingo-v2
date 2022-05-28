import { Router } from "express";
import BingoTileRouter from "./bingotile/bingotile.routes";

const router = Router();

router.use('/bingotile', BingoTileRouter)

export default router;