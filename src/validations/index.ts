import Joi from 'joi';

// Validation
export const payloadSchema = Joi.object({
    status: Joi
        .number()
        .required()
        .description('Status to be return to client')
});