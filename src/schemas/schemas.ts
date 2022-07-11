import joi from "joi";

const dataActivateCard = joi.object({
    id: joi.number().required(),
    cvc: joi.string().required().min(3).max(3),
    password: joi.string().required().min(4)
});

const valueCard = joi.object({
    id: joi.number().required(),
    value: joi.number().required().min(0)
})

export {
    dataActivateCard,
    valueCard
} 
    