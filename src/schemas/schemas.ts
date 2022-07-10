import joi from "joi";

const dataActivateCard = joi.object({
    id: joi.number().required(),
    cvc: joi.string().required().min(4).max(4),
    password: joi.string().required().min(4)
});

export default dataActivateCard;