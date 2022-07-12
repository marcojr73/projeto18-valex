import { Request, Response } from "express"

import * as cardMiddleware from "../middlewares/validationMiddlewares.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesBlock from "../services/lockUnlockServices.js"
import * as servicesPurchases from "../services/purchasesServices.js"
import * as servicesBalance from "../services/balanceCardService.js"

import * as utils from "../utils/utils.js"


async function purchase(req: Request, res: Response){
    const {cardId, password, businessId, amount}: {cardId: number, password: string, businessId: number, amount: number} = req.body
    const {number, cardholder, expirationDate, cvc}: {number: string, cardholder: string, expirationDate: string, cvc: string, } = req.body
    
    let card
    const type = cardMiddleware.validateTypeTransaction(number, cardholder, expirationDate, cvc, cardId, password)
    const aux: boolean = true
    

    if(type === "online") {
        await cardMiddleware.validateDataPurchaseOnline(number, cardholder, expirationDate, cvc)
        card = await servicesPurchases.getCardOnline(number, cardholder, expirationDate)
        console.log(card)
        servicesPurchases.validateCorrectDataSend(number,cardholder, expirationDate, cvc, card)
        servicesActivate.validateCvc(card.securityCode, cvc)
    }
    if(type === "pos") {
        await cardMiddleware.validateDataPurchase(cardId, password, businessId, amount)
        card = await utils.verifyCard(cardId)
        servicesBlock.validatePass(card.password, password)
    }
    
    await utils.validateStatus(card, aux)
    utils.validateCardExpiration(card.expirationDate)
    

    await servicesPurchases.validateBusiness(card.type, businessId)
    const balance = await servicesBalance.findCards(card.id)
    await servicesPurchases.validateValue(balance.balance, amount)
    await servicesPurchases.insertPurchase(card.id, businessId, amount)

    res.status(200).send("Purchase registered sucessfull")
}

export {
    purchase
}