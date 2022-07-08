async function validateType(typeCard: String){
    const ans = typeCard === 'groceries' || typeCard === 'restaurants'||
                typeCard === 'transport'|| typeCard === 'education'|| typeCard === 'health'

    if(!ans) throw {
        status: 422,
        message: "You not sent a valid card type"
    }
}

export {
    validateType
}