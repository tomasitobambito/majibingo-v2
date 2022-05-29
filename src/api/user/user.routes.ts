import { Router } from "express";
import { create, deleteById, getAll, getById, updateById } from "./user.controller";

const UserRouter = Router();

UserRouter.route('/getall').get(getAll);
UserRouter.route('/get/:id').get(getById);
UserRouter.route('/create').post(create);
UserRouter.route('/update/:id').put(updateById);
UserRouter.route('/delete/:id').delete(deleteById);

export default UserRouter;