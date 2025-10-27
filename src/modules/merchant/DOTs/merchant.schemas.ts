import Joi from "joi";

export const merchantSchemas = {
    createMerchant: Joi.object({
        name: Joi.string().required(),
        userId: Joi.string().required(),
        currency: Joi.string().required(),
        balance: Joi.number().required(),
    }),

    details: Joi.object({
        id: Joi.string().required(),
    }),

    list: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().optional()
    }),

    update: Joi.object({
        name: Joi.string().optional(),
        currency: Joi.string().optional(),
        balance: Joi.number().optional(),
    }),
}