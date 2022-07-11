import * as servicesCreate from "../services/createCardServices.js"
import * as middlewareCard from "../middlewares/cardMiddleware.js"
import * as servicesActivate from "../services/activateCardServices.js"

import { Request, Response } from "express";


async function reloadCard(req: Request, res: Response){
    const apiKey = req.headers.apikey
    const {id, value} = req.body
    const aux = true

    await servicesCreate.validateKey(apiKey)
    await middlewareCard.validateValue(id, value)
    const card = await servicesActivate.verifyCard(id)
    await servicesActivate.validateStatus(card, aux)
    res.send("bala azul")

}

export {
    reloadCard
}