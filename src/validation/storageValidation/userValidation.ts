import Joi from 'joi'
import userType from '../../types/userType'
import { Request } from 'express'

export const createUserStorageValidation = (payload: userType) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

export const updateUserStorageValidation = (payload: userType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    email: Joi.string().allow('', null),
    password: Joi.string().allow('', null),
    role: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

export const deleteSessionValidation = (req: Request) => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  const schema = Joi.object({
    accessToken: Joi.string().required()
  })
  return schema.validate({ accessToken })
}

export const refreshSessionValidation = (payload: userType) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(payload)
}
