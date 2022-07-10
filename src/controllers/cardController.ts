import { Request, Response } from "express";

import * as middlewares from "../middlewares/cardMiddleware.js"
import * as servicesCreate from "../services/createCardServices.js"
import * as servicesActivate from "../services/activateCardServices.js"

async function create(req: Request, res: Response){
//[x] devo receber o identificador do funcionário
//[x] devo receber a chave de api da empresa pelo header
//[x] devo receber o tipo de cartão
//[x] devo validar se o tipo de cartão esta correto
//[x] devo validar se a chave pertence a uma empresa registrada
//[x] devo validar se o funcionário existe
//[x] devo gerar e armazenar o numero do cartão
//[x] devo formatar o nome do funcionário
//[x] a data de expiração deve ser para daq a 5 anos
//[x] devo gerar um cvc para o cartão
//[x] devo criptografar a cvc do cartão para armazena-la

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
//[x] devo receber o identificador do cartão
//[x] devo receber o cvc do cartão
//[x] devo receber uma senha de 4 digitos para o cartão
//[x] devo validar se o cartão existe, ainda não esta ativado e não expirado
//[x] devo validar se o cvc esta correto
//[x] devo criptografar e armazenar a senha

    const {id, cvc, password}: {id:number, cvc: string, password: string}  = req.body
    
    const validateData = await middlewares.validateDataCard(id, cvc, password)
    const securityCode = await servicesActivate.verifyCard(id)
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