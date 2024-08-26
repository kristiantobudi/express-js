/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import Joi from "joi";
import UserType from "../types/auth.type";

export const createUserValidation = (payload: UserType) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().allow('', null)
    })
    return schema.validate(payload)
}

export const createSessionValidation = (payload: UserType) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(payload)
}

export const deleteSessionValidation = (payload: UserType) => {
    const schema = Joi.object({
        accessToken: Joi.string().required()
    })
    return schema.validate(payload)
}

export const updateUserValidation = (payload: UserType) => {
    const schema = Joi.object({
        username: Joi.string().allow('', null),
        password: Joi.string().allow('', null),
        first_name: Joi.string().allow('', null),
        last_name: Joi.string().allow('', null),
        email: Joi.string().allow('', null),
        role: Joi.string().allow('', null)
    })
    return schema.validate(payload)
}

export const refreshSessionValidation = (payload: UserType) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required(),
    })
    return schema.validate(payload)
}
