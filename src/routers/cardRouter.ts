import { Router } from "express";
import { activate, balance, block, card, create, unlock } from "../controllers/cardController.js";

const cardRouter = Router()

cardRouter.post("/card/create", create)
cardRouter.post("/card/activate", activate)
cardRouter.get("/card/:cardId", card)
cardRouter.get("/card/balance/:id", balance)
cardRouter.put("/card/block", block)
cardRouter.put("/card/unlock", unlock)

export default cardRouter