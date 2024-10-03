import Joi from 'joi'
import storageTypes from '../../types/locationStorageType'

export const createStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    storage_id: Joi.string().optional(),
    storage_name: Joi.string().required(),
    description: Joi.string().required(),
    sequence_value: Joi.number().optional(),
    _id: Joi.string().optional()
  })
  return schema.validate(payload)
}

export const updateStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    storage_id: Joi.string().optional(),
    storage_name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}

export const deleteStorageLocationValidation = (payload: storageTypes) => {
  const schema = Joi.object({
    storage_id: Joi.string().optional(),
    storage_name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}
