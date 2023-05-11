import joi from "joi";

export const jogoSchema=joi.object({
    name:joi.string().required(),
    image:joi.string().uri().required(),
    stockTotal:joi.number().integer().required().min(1),
    pricePerDay:joi.number().integer().required().min(1)
})