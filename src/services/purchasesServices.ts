import * as repositoriesPayments from "../repositories/paymentRepository.js"
import * as repositoriesBusiness from "../repositories/businessRepository.js"
import * as repositoriesCard from "../repositories/cardRepository.js"

async function validateBusiness(typeCard: string, businessId: number){
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

async function getCardOnline(number: string, cardholder: string, expirationDate: string){
    const card = await repositoriesCard.findByCardDetails(number, cardholder, expirationDate)
    if(!card) throw {
        status: 422,
        message: "this card not exist"
    }
    return card
}

function validateCorrectDataSend(number: string, cardHolder: string, expirationDate: string, cvc: string, card){
    if(card.number === number && card.cardholderName === cardHolder && card.expirationDate === expirationDate) return
    else throw {
        status: 422,
        message: "you not sent valid data of this card"
    }
}



export {
    validateBusiness,
    validateValue,
    insertPurchase,
    getCardOnline,
    validateCorrectDataSend
}