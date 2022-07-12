import Cryptr from "cryptr"
import * as repositoriesCard from "../repositories/cardRepository.js"

function validatePass(passCrypt:string, password: string){
    const cryptr = new Cryptr('myTotallySecretKey')
    const ans = cryptr.decrypt(passCrypt)
    if(ans != password) {
        throw {
            status: 401,
            message: "this password is incorrect"
        }
    }
}

function validateBlocked(card, aux: boolean){
    let message: string = "this card is already unlocked"
    if(aux){
        message = "this card is already blocked"
    }
    if(card.isBlocked === aux || card.password === null){
        throw {
            status: 422,
            message,
        }
    }
}

async function blockCard(id: number, aux: boolean){
    await repositoriesCard.block(id, aux)
}

export {
    validatePass,
    validateBlocked,
    blockCard
}