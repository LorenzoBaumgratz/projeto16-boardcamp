import Joi from "joi";

export const aluguelSchema=Joi.object({
    customerId:Joi.number().min(1),
    gameId:Joi.number().min(1),
    daysRented:Joi.number().min(1)
})