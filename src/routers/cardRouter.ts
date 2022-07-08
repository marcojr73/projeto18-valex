import { Router } from "express";
import { activate, balance, block, card, unlock } from "../controllers/cardController.js";

const cardRouter = Router()

cardRouter.post("/create", card)
cardRouter.post("/activate", activate)
cardRouter.get("/card", card)
cardRouter.get("/balance", balance)
cardRouter.post("/block", block)
cardRouter.post("/unlock", unlock)

export default cardRouter