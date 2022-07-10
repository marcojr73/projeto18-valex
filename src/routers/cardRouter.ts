import { Router } from "express";
import { activate, balance, block, card, create, unlock } from "../controllers/cardController.js";

const cardRouter = Router()

cardRouter.post("/create", create)
cardRouter.post("/activate", activate)
cardRouter.get("/card", card)
cardRouter.get("/balance/:id", balance)
cardRouter.post("/block", block)
cardRouter.post("/unlock", unlock)

export default cardRouter