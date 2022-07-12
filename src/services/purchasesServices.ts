import * as repositoriesPayments from "../repositories/paymentRepository.js"
import * as repositoriesBusiness from "../repositories/businessRepository.js"

async function validateBusiness(typeCard, businessId){
    const business = await repositoriesBusiness.findById(businessId)
    if(!business || business.type !== typeCard) throw {
        status: 404,
        message: "this business is not register for this type of card"
    }
    return business
}

async function validateValue(balance: number, amount: number){
    if(balance < amount) throw {
        status: 422,
        message: "balance not suficient"
    }
}

async function insertPurchase(cardId: number, businessId: number, amount: number){
    await repositoriesPayments.insert({cardId, businessId, amount})
}

export {
    validateBusiness,
    validateValue,
    insertPurchase
}