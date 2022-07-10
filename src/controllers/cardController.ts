import { Request, Response } from "express";

import * as middlewares from "../middlewares/cardMiddleware.js"
import * as servicesCreate from "../services/createCardServices.js"
import * as servicesActivate from "../services/activateCardServices.js"
import * as servicesBalance from "../services/balanceCardService.js"

async function create(req: Request, res: Response){

    const apiKey = req.headers.apikey
    const {employeeId, type}: {employeeId: Number, type: String} = req.body
    
    await middlewares.validateType(type)
    await servicesCreate.validateKey(apiKey)
    const fullName = await servicesCreate.validateEmployee(employeeId)
    await servicesCreate.validateUniqueCard(type, employeeId)
    const number = await servicesCreate.generateNumberCard()
    const cardholderName = await servicesCreate.formatNameCard(fullName)
    const expirationDate = await servicesCreate.generatecardExpiration()
    const securityCode = await servicesCreate.generateSecurityCode()
    await servicesCreate.insertCardData(employeeId,number,cardholderName,securityCode, expirationDate, type)

    res.status(201).send("Card create successful")

}

async function activate(req: Request, res: Response){
    const {id, cvc, password}: {id:number, cvc: string, password: string}  = req.body
    
    const validateData = await middlewares.validateDataCard(id, cvc, password)
    const card = await servicesActivate.verifyCard(id)
    const securityCode = await servicesActivate.validateDateExpiration(card)
    servicesActivate.validateCvc(securityCode, cvc)
    const passCrypt = await servicesActivate.encryptPassword(password)
    await servicesActivate.insertData(id, passCrypt)

    res.status(200).send("activate card sucessfull")

}

async function card(req: Request, res: Response){
// devo receber o identificador do funcionário e a senha do cartão
// devo validar se o cartão existe
// devo validar se o cartão esta ativado
// devo validar se a senha esta correta 
}

async function balance(req: Request, res: Response){
    const {id} = (req.params)
    
    const card = await servicesActivate.verifyCard(id)
    const balance = await servicesBalance.findCards(id)
    
    res.status(200).send(balance)
}

async function block(req: Request, res: Response){
    
}

async function unlock(req: Request, res: Response){
    
}

export {
    create,
    activate,
    card,
    balance,
    block,
    unlock
}