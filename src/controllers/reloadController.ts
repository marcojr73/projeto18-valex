import * as middlewareCard from "../middlewares/validationMiddlewares.js"
import * as servicesReload from "../services/reloadService.js"

import * as utils from "../utils/utils.js"

import { Request, Response } from "express";


async function reloadCard(req: Request, res: Response){
    const apiKey = req.headers.apikey
    const {id, value}: {id: number, value: number} = req.body
    const aux: boolean = true

    utils.validateKey(apiKey)
    middlewareCard.validateValue(id, value)
    const card = await utils.verifyCard(id)
    await utils.validateStatus(card, aux)
    utils.validateCardExpiration(card.expirationDate)
    await servicesReload.reloadCard(id, value)

    res.status(200).send("recharge performed sucessfull")
}

export {
    reloadCard
}