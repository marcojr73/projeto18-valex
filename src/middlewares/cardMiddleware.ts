async function validateType(typeCard){
    const ans = typeCard === 'groceries' || typeCard === 'restaurants'||
                typeCard === 'transport'|| typeCard === 'education'|| typeCard === 'health'

    if(!ans) throw {
        status: 400,
        message: "You not sent a valid card type"
    }
}

export {
    validateType
}