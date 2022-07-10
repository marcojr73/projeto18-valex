import Cryptr from "cryptr"

import * as repositories from "../repositories/cardRepository.js"

import dayjs from "dayjs"

async function verifyCard(id: number){
    const ans = await repositories.findById(id)
    if(!ans){
        throw {
            status: 404,
            message: "this card not exist"
        }
    }
    const dateValidation = validateDateExpiration(ans.expirationDate)
    if(ans.password !== null || !dateValidation || !ans.isBlocked){
        throw {
            status: 422,
            message: "this card is already active"
        }
    }
    return ans.securityCode
}

function validateDateExpiration(expiration){
    return true
}

function validateCvc(securityCode, cvc){
    const cryptr = new Cryptr('myTotallySecretKey')
    const ans = cryptr.decrypt(securityCode)
    if(ans !== cvc) {
        throw {
            status: 401,
            message: "security code send incorrect"
        }
    }
}

function encryptPassword(password){
    const cryptr = new Cryptr('myTotallySecretKey')
    return cryptr.encrypt(password)
}

async function insertData(id, passCrypt){
    const ans = await repositories.update(id, passCrypt)
    // console.log(ans)

}

export {
    verifyCard,
    validateCvc,
    encryptPassword,
    insertData
}