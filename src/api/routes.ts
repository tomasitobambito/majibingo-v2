import { Router } from "express";
import BoardRouter from "./board/board.routes";
import SuggestionRouter from "./suggestion/suggestion.routes";
import TileRouter from "./tile/tile.routes";
import UserRouter from "./user/user.routes";

const router = Router();

router.use('/tile', TileRouter);
router.use('/board', BoardRouter);
router.use('/suggestion', SuggestionRouter);
router.use('/user', UserRouter);

export default router;