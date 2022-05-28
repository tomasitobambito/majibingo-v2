import { Router } from "express";
import { getTeams } from "./teams.controller";

const TeamsRoutes = Router();

TeamsRoutes.route('/').get(getTeams);

export default TeamsRoutes;