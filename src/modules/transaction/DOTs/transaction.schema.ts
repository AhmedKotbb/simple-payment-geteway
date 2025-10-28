import Joi from "joi";

export const TransactionSchemas = {
    createTransaction: Joi.object({
        amount: Joi.number().positive().required(),
        currency: Joi.string().required(),
        merchantId: Joi.string().required(),
        acountHolderName: Joi.string().required(),
        accountHolderNumber: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
        expireDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required(), // mm/yy format.required(),
        csv: Joi.string().required(),
    }),

    details:  Joi.object({
        id: Joi.string().required(),
    }),

    list: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().optional()
    })
}