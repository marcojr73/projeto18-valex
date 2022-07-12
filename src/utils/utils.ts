import dayjs from "dayjs"

import * as repositories from "../repositories/cardRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"



async function verifyCard(id){
    const ans = await repositories.findById(id)
    if(!ans){
        throw {
            status: 404,
            message: "this card not exist"
        }
    }
    return ans
}

function validateCardExpiration(expiration){
    const monthExpiration = parseInt(expiration.split("/")[0])
    const yearExpiration = parseInt(expiration.split("/")[1])
    const monthCurrently = parseInt(dayjs().format("MM"))
    const yearCurrently = parseInt(dayjs().format("YY"))

    if(yearCurrently > yearExpiration || yearCurrently === yearExpiration && monthCurrently > monthExpiration){
        throw {
            status: 422,
            message: "This card expired"
        }
    }
}

function validateStatus(ans, aux: boolean){
    if(aux) {
        if(ans.password === null || ans.isBlocked){
            throw {
                status: 422,
                message: "this card is not active"        
            }
        }
        return
    }
    if(ans.password !== null || !ans.isBlocked){
        throw {
            status: 422,
            message: "this card is already active"
        }
    }
    return ans.securityCode
}

async function validateKey(keyCompany){
    const ans = await companyRepository.findByApiKey(keyCompany)

    if(!ans) throw {
        status: 422,
        message: "this key is not register"
    }
    return ans.id
}

export {
    verifyCard,
    validateCardExpiration,
    validateStatus,
    validateKey
}