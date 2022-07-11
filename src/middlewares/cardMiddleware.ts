import * as schemas from "../schemas/schemas.js"

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

async function validateValue(id, value){
    await schemas.valueCard.validateAsync({id, value})
}

export {
    validateType,
    validateDataCard,
    validateValue
}