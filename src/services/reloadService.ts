import * as repositoriesReload from "../repositories/rechargeRepository.js" 

async function reloadCard(cardId: number, amount: number){
    await repositoriesReload.insert({cardId, amount})
}

export {
    reloadCard,
}