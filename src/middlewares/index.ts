import Joi from 'joi';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../exceptions'
// validation middleware
export const validateBody = (schema: Joi.Schema) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    try {
        const res = await schema.validateAsync(payload);
        next();
    } catch (e: any) {
        throw new BadRequestError(e?.details[0].message);
    }
});