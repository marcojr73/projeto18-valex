import joi from "joi";

const dataActivateCard = joi.object({
    id: joi.number().required(),
    cvc: joi.string().required().min(3).max(3),
    password: joi.string().required().min(4)
});

export default dataActivateCard;