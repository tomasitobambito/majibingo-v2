import { Router } from "express";
import BingoTileRouter from "./bingotile/bingotile.routes";
import TeamsRoutes from "./teams/teams.routes";

const router = Router();

router.use('/teams', TeamsRoutes)
router.use('/bingotile', BingoTileRouter)

export default router;