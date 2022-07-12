import Cryptr from "cryptr"

import * as repositories from "../repositories/cardRepository.js"

// import dayjs from "dayjs"

// async function verifyCard(id){
//     const ans = await repositories.findById(id)
//     if(!ans){
//         throw {
//             status: 404,
//             message: "this card not exist"
//         }
//     }
//     return ans
// }

// function validateCardExpiration(expiration){
//     const monthExpiration = parseInt(expiration.split("/")[0])
//     const yearExpiration = parseInt(expiration.split("/")[1])
//     const monthCurrently = parseInt(dayjs().format("MM"))
//     const yearCurrently = parseInt(dayjs().format("YY"))

//     if(yearCurrently > yearExpiration || yearCurrently === yearExpiration && monthCurrently > monthExpiration){
//         throw {
//             status: 422,
//             message: "This card expired"
//         }
//     }
// }

// function validateStatus(ans, aux){
//     if(aux) {
//         if(ans.password === null || ans.isBlocked){
//             throw {
//                 status: 422,
//                 message: "this card is not active"        
//             }
//         }
//         return
//     }
//     if(ans.password !== null || !ans.isBlocked){
//         throw {
//             status: 422,
//             message: "this card is already active"
//         }
//     }
//     return ans.securityCode
// }

function validateCvc(securityCode, cvc: string){
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
    // verifyCard,
    // validateCardExpiration,
    // validateStatus,
    validateCvc,
    encryptPassword,
    insertData
}