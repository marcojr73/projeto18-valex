import { Router } from "express";
import { reloadCard } from "../controllers/reloadController.js";
var reloadRouter = Router();
reloadRouter.post("/reload", reloadCard);
export default reloadRouter;
