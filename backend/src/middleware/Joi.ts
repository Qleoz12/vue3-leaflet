import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';
import Logging from '../library/Logging';
import { IParking } from '../models/Parking';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    },
    parking: {
        create: Joi.object<IParking>({
            name: Joi.string()
                .regex(/^[0-9a-zA-Z]{5,}$/)
                .required(),
             locations: Joi.object().keys({ 
                lat:Joi.number(),
                lng:Joi.number(),

             }),
            capacity: Joi.number().required()
        })
    }
};
