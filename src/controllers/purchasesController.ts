import { Request, Response } from "express"

import * as cardMiddleware from "../middlewares/validationMiddlewares.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesBlock from "../services/lockUnlockServices.js"
import * as servicesPurchases from "../services/purchasesServices.js"
import * as servicesBalance from "../services/balanceCardService.js"

import * as utils from "../utils/utils.js"


async function purchase(req: Request, res: Response){
    const {cardId, password, businessId, amount}: {cardId: number, password: string, businessId: number, amount: number} = req.body
    const aux: boolean = true

    await cardMiddleware.validateDataPurchase(cardId, password, businessId, amount)
    const card = await utils.verifyCard(cardId)
    await utils.validateStatus(card, aux)
    utils.validateCardExpiration(card.expirationDate)
    servicesBlock.validatePass(card.password, password)
    await servicesPurchases.validateBusiness(card.type, businessId)
    const balance = await servicesBalance.findCards(cardId)
    await servicesPurchases.validateValue(balance.balance, amount)
    await servicesPurchases.insertPurchase(cardId, businessId, amount)

    res.status(200).send("Purchase registered sucessfull")
}

export {
    purchase
}