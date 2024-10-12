import Joi from 'joi'
import itemType from '../../types/itemType'
export const createItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().required(),
    item_name: Joi.string().min(1).required(),
    sku: Joi.string().min(1).optional().allow(''),
    quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().min(1).required(),
    storage_location: Joi.string().min(1).required(),
    sequence_value: Joi.number().optional(),
    _id: Joi.string().optional()
  })
  return schema.validate(payload)
}

export const updateItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().optional(),
    item_name: Joi.string().min(1).required(),
    sku: Joi.string().min(1).optional().allow(''),
    quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().min(1).required(),
    storage_location: Joi.string().min(1).required()
  })
  return schema.validate(payload)
}

export const deleteItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().optional(),
    item_name: Joi.string().min(1).required(),
    sku: Joi.string().min(1).optional().allow(''),
    quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().min(1).required(),
    storage_location: Joi.string().min(1).required()
  })
  return schema.validate(payload)
}
