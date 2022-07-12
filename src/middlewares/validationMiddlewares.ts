import * as schemas from "../schemas/schemas.js"

async function validateType(typeCard){
    const ans = ["groceries", "restaurant", "transport", "education", "health"].includes(typeCard)

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

async function validateDataPurchase(cardId: number, password: string, businessId: number, amount: number){
    await schemas.dataPurchase.validateAsync({cardId, password, businessId, amount})
}

function validateTypeTransaction(number: string, cardholder: string, expirationDate: string, cvc: string, cardId: number, password: string){
    if(number && cardholder && expirationDate && cvc) return "online"
    if(cardId && password) return "pos"
    throw {
        status: 422,
        message: "you not send correct data"
    }
}

async function validateDataPurchaseOnline(number: string, cardholder: string, expirationDate: string, cvc: string){
    await schemas.dataPurchaseOnline.validateAsync({number, cardholder, expirationDate, cvc})
}

export {
    validateType,
    validateDataCard,
    validateValue,
    validateDataPurchase,
    validateDataPurchaseOnline,
    validateTypeTransaction
}