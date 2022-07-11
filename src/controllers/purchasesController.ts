import { Request, Response } from "express"

import * as cardMiddleware from "../middlewares/cardMiddleware.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesBlock from "../services/lockUnlockServices.js"
import * as servicesPurchases from "../services/purchasesServices.js"
import * as servicesBalance from "../services/balanceCardService.js"

async function purchase(req: Request, res: Response){
    const {cardId, password, businessId, amount}: {cardId: number, password: string, businessId: number, amount: number} = req.body
    const aux: boolean = true

    await cardMiddleware.validateDataPurchase(cardId, password, businessId, amount)
    const card = await servicesActivate.verifyCard(cardId)
    await servicesActivate.validateStatus(card, aux)
    servicesActivate.validateCardExpiration(card.expirationDate)
    servicesBlock.validatePass(card.password, password)
    const business = await servicesPurchases.validateBusiness(card.type, businessId)
    const balance = await servicesBalance.findCards(cardId)
    await servicesPurchases.validateValue(balance.balance, amount)
    res.send("bala azul")
}

export {
    purchase
}