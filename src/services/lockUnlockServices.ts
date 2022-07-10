import Cryptr from "cryptr"
import * as repositoriesCard from "../repositories/cardRepository.js"

function validatePass(passCrypt, password){
    const cryptr = new Cryptr('myTotallySecretKey')
    const ans = cryptr.decrypt(passCrypt)
    if(ans != password) {
        throw {
            status: 401,
            message: "this password is incorrect"
        }
    }
}

function validateBlocked(card){
    if(card.isBlocked){
        throw {
            status: 422,
            message: "this card is already blocked"
        }
    }
}

async function blockCard(id){
    await repositoriesCard.block(id)
}

export {
    validatePass,
    validateBlocked,
    blockCard
}