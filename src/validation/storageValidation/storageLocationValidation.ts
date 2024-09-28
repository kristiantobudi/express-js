import Joi from 'joi'
import storageTypes from '../../types/locationStorageType'

export const createStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    location_name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}

export const updateStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    location_name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}

export const deleteStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    location_name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}
