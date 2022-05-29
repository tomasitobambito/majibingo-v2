import { Router } from "express";
import { get } from "./board.controller";

const BoardRouter = Router();

BoardRouter.route('/get/:seed').get(get);

export default BoardRouter;