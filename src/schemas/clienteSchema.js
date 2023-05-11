import Joi from "joi";

export const clienteSchema=Joi.object({
    name:Joi.string().required().min(1),
    phone:Joi.string().required().min(10).max(11).pattern(/^[0-9]+$/),
    cpf:Joi.string().required().min(11).max(11).pattern(/^[0-9]+$/),
    birthday:Joi.date()
})