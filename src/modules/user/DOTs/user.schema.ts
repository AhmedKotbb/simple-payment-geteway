import * as Joi from 'joi';

export const UserSchemas = {

    createUserSchema: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid('admin', 'partner', 'merchant').required(),
        password: Joi.string().min(6).max(10).required(),
        confiremPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'confiremPassword must match password',
            }),
    }),

    listUsers: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().optional()
    })
}
