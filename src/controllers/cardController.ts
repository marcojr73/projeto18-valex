import { Request, Response } from "express";

import * as middlewares from "../middlewares/validationMiddlewares.js"
import * as servicesCreate from "../services/createCardServices.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesBalance from "../services/balanceCardService.js"
import * as servicesLockUnlock from "../services/lockUnlockServices.js"

import * as utils from "../utils/utils.js"

async function create(req: Request, res: Response){

    const apiKey = req.headers.apikey
    const {employeeId, type}: {employeeId: Number, type: String} = req.body
    
    await middlewares.validateType(type)
    await utils.validateKey(apiKey)
    const fullName = await servicesCreate.validateEmployee(employeeId)
    await servicesCreate.validateUniqueCard(type, employeeId)
    const number = await servicesCreate.generateNumberCard()
    const cardholderName = await servicesCreate.formatNameCard(fullName)
    const expirationDate = await servicesCreate.generatecardExpiration()
    const securityCode = await servicesCreate.generateSecurityCode()
    await servicesCreate.insertCardData(employeeId, number, cardholderName, securityCode, expirationDate, type)

    res.status(201).send("Card create successful")

}

async function activate(req: Request, res: Response){
    const {id, cvc, password}: {id:number, cvc: string, password: string}  = req.body
    const aux: boolean = false
    
    await middlewares.validateDataCard(id, cvc, password)
    const card = await utils.verifyCard(id)
    utils.validateCardExpiration(card.expirationDate)
    const securityCode: string = await utils.validateStatus(card, aux)
    servicesActivate.validateCvc(securityCode, cvc)
    const passCrypt = servicesActivate.encryptPassword(password)
    await servicesActivate.insertData(id, passCrypt)

    res.status(200).send("activate card sucessfull")

}

async function card(req: Request, res: Response){
    const {cardId, employeeId}: {cardId: number, employeeId: number} = req.body
    const aux: boolean = true

    const card = await utils.verifyCard(cardId)
    await utils.validateStatus(card, aux)
    const ans = await servicesBalance.getDataCard(card)
    
    res.status(200).send(ans)
}

async function balance(req: Request, res: Response){
    const {id} = (req.params)
    
    await utils.verifyCard(id)
    const balance = await servicesBalance.findCards(id)
    
    res.status(200).send(balance)
}

async function block(req: Request, res: Response){
    const {id, password}: {id: number, password: string} = req.body
    const aux: boolean = true
    
    const card = await utils.verifyCard(id)
    servicesLockUnlock.validateBlocked(card, aux)
    utils.validateCardExpiration(card.expirationDate)
    servicesLockUnlock.validatePass(card.password, password)
    await servicesLockUnlock.blockCard(id, aux)

    res.status(204).send("card blocked sucessfull")
}

async function unlock(req: Request, res: Response){
    const {id, password}: {id: number, password: string} = req.body
    const aux: boolean = false

    const card = await utils.verifyCard(id)
    servicesLockUnlock.validateBlocked(card, aux)
    utils.validateCardExpiration(card.expirationDate)
    servicesLockUnlock.validatePass(card.password, password)
    await servicesLockUnlock.blockCard(id, aux)

    res.status(204).send("card unlocked sucessfull")
}

export {
    create,
    activate,
    card,
    balance,
    block,
    unlock
}