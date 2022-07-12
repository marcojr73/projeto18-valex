import joi from "joi";

const dataActivateCard = joi.object({
    id: joi.number().required(),
    cvc: joi.string().required().min(3).max(3),
    password: joi.string().required().min(4)
});

const valueCard = joi.object({
    id: joi.number().required(),
    value: joi.number().required().min(1)
})

const dataPurchase = joi.object({
    cardId: joi.number().required(),
    password: joi.string().min(4).max(4).required(),
    businessId: joi.number().required(),
    amount: joi.number().min(1).required()
})

const dataPurchaseOnline = joi.object({
    number: joi.string().required(), 
    cardholder: joi.string().required(),
    expirationDate: joi.string().required(),
    cvc: joi.string().min(3).max(3).required()
})

export {
    dataActivateCard,
    valueCard,
    dataPurchase,
    dataPurchaseOnline
} 
    