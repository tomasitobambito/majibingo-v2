import { Router } from "express";
import { create, getById, getAll, updateById, deleteById } from "./tile.controller";

const TileRouter = Router();

TileRouter.route('/getall').get(getAll);
TileRouter.route('/get/:id').get(getById);
TileRouter.route('/create').post(create);
TileRouter.route('/update/:id').put(updateById);
TileRouter.route('/delete/:id').delete(deleteById);

export default TileRouter;