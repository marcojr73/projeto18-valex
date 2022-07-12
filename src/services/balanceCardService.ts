import Cryptr from "cryptr"

import * as repositoriesPayments from "../repositories/paymentRepository.js"
import * as repositoriesRecharge from "../repositories/rechargeRepository.js"

async function findCards(cardId){
    const transactions = await repositoriesPayments.findByCardId(cardId)
    const recharges = await repositoriesRecharge.findByCardId(cardId)

    const balance = calculateBalace(transactions, recharges)

    const ans = {
        balance,
        transactions,
        recharges,
    }
    return ans
}

function calculateBalace(transactions, recharges){
    let amount = 0
    recharges.forEach(recharges=>{
        amount += recharges.amount
    })
    transactions.forEach(transaction=>{
        amount -= transaction.amount
    })
    return amount
}

async function getDataCard(card){
    const cryptr = new Cryptr('myTotallySecretKey')
    const ans = cryptr.decrypt(card.securityCode)
    return {
        number: card.number,
        cardholderName: card.cardholderName,
        expirationDate: card.expirationDate,
        CVC: ans
    }
}

export {
    findCards,
    getDataCard
}