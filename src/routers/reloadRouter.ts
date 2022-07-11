import { Router } from "express";
import { reloadCard } from "../controllers/reloadController.js";

const reloadRouter = Router()

reloadRouter.post("/reload", reloadCard)

export default reloadRouter