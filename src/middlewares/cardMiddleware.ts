import dataActivateCard from "../schemas/schemas.js"

async function validateType(typeCard){
    const ans = typeCard === 'groceries' || typeCard === 'restaurant'||
                typeCard === 'transport'|| typeCard === 'education'|| typeCard === 'health'

    if(!ans) throw {
        status: 400,
        message: "You not sent a valid card type"
    }
}

async function validateDataCard(id: number, cvc: string, password: string){
    const ans = await dataActivateCard.validateAsync({id, cvc, password})
    if(!ans) throw {
        status: 422,
        message: "you did not send correct data"
    }
}

export {
    validateType,
    validateDataCard
}