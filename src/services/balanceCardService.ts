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

export {
    findCards
}