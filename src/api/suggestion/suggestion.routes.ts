import { Router } from "express";
import { create, deleteById, getAll, getById } from "./suggestion.controller";

const SuggestionRouter = Router();

SuggestionRouter.route('/getall').get(getAll);
SuggestionRouter.route('/get/:id').get(getById);
SuggestionRouter.route('/create').post(create);
SuggestionRouter.route('/delete/:id').delete(deleteById);

export default SuggestionRouter;