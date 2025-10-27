import Joi from "joi";

export const authSchemas = {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).required(),
    }),
}