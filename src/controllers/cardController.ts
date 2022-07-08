import { Request, Response } from "express";

import * as middlewares from "../middlewares/cardMiddleware.js"
import * as services from "../services/cardServices.js"

async function create(req: Request, res: Response){
//[x] devo receber o identificador do funcionário
//[x] devo receber a chave de api da empresa pelo header
//[x] devo receber o tipo de cartão
//[x] devo validar se o tipo de cartão esta correto
//[x] devo validar se a chave pertence a uma empresa registrada
//[x]devo validar se o funcionário existe
// devo formatar o nome do funcionário
// a data de expiração deve ser para daq a 5 anos
// devo gerar um cvc para o cartão
// devo criptografar a cvc do cartão para armazena-la

    const keyCompany: String = req.params.key
    const {employeeId, typeCard}: {employeeId: Number, typeCard: String} = req.body

    await middlewares.validateType(typeCard)
    await services.validateKey(keyCompany)
    await services.validateEmployee(employeeId)
    await services.validateUniqueCard(typeCard, employeeId)

    res.send("bala azul")

}

async function activate(req: Request, res: Response){
// devo receber o identificador do cartão
// devo receber o cvc do cartão
// devo receber uma senha de 4 digitos para o cartão
// devo validar se o cartão existe, ainda não esta ativado e não expirados
// devo validar se o cvc esta correto
// devo criptografar e armazenar a senha
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