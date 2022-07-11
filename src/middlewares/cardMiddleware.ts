import * as schemas from "../schemas/schemas.js"
import Joi, { isError } from "joi";

async function validateType(typeCard){
    const ans = typeCard === 'groceries' || typeCard === 'restaurant'||
                typeCard === 'transport'|| typeCard === 'education'|| typeCard === 'health'

    if(!ans) throw {
        status: 400,
        message: "You not sent a valid card type"
    }
}

async function validateDataCard(id: number, cvc: string, password: string){
    await schemas.dataActivateCard.validateAsync({id, cvc, password})
}

async function validateValue(id: number, value: number){
    await schemas.valueCard.validateAsync({id, value})
}

async function validateDataPurchase(cardId, password, businessId, amount){
    await schemas.dataPurchase.validateAsync({cardId, password, businessId, amount})
}

export {
    validateType,
    validateDataCard,
    validateValue,
    validateDataPurchase
}