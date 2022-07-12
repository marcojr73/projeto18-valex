import Cryptr from "cryptr"

import * as repositories from "../repositories/cardRepository.js"

function validateCvc(securityCode: string, cvc: string){
    const cryptr = new Cryptr('myTotallySecretKey')
    const ans = cryptr.decrypt(securityCode)
    if(ans !== cvc) {
        throw {
            status: 401,
            message: "security code send incorrect"
        }
    }
}

function encryptPassword(password: string){
    const cryptr = new Cryptr('myTotallySecretKey')
    return cryptr.encrypt(password)
}

async function insertData(id: number, passCrypt: string){
    await repositories.update(id, passCrypt)
}

export {
    validateCvc,
    encryptPassword,
    insertData
}