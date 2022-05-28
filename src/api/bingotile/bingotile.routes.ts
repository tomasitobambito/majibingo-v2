import { Router } from "express";
import { create, getById, getAll, updateById, deleteById } from "./bingotile.controller";

const BingoTileRouter = Router();

BingoTileRouter.route('/getall').get(getAll);
BingoTileRouter.route('/get/:id').get(getById);
BingoTileRouter.route('/create').post(create);
BingoTileRouter.route('/update/:id').put(updateById);
BingoTileRouter.route('/delete/:id').delete(deleteById);

export default BingoTileRouter;