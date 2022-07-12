import { Router } from "express";
import { purchase } from "../controllers/purchasesController.js";
var purchaseRouter = Router();
purchaseRouter.post("/purchase", purchase);
export default purchaseRouter;
