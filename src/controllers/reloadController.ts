import * as servicesCreate from "../services/createCardServices.js"
import * as middlewareCard from "../middlewares/cardMiddleware.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesReload from "../services/reloadService.js"

import { Request, Response } from "express";


async function reloadCard(req: Request, res: Response){
    const apiKey = req.headers.apikey
    const {id, value}: {id: number, value: number} = req.body
    const aux: boolean = true

    servicesCreate.validateKey(apiKey)
    middlewareCard.validateValue(id, value)
    const card = await servicesActivate.verifyCard(id)
    await servicesActivate.validateStatus(card, aux)
    servicesActivate.validateCardExpiration(card.expirationDate)
    await servicesReload.reloadCard(id, value)

    res.status(200).send("recharge performed sucessfull")
}

export {
    reloadCard
}