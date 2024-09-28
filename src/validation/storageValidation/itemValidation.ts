import Joi from 'joi'
import itemType from '../../types/itemType'

export const createItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().required(),
    item_name: Joi.string().min(1).required(),
    sku: Joi.string().optional().allow(''),
    quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
    storage_location: Joi.string().required()
  })
  return schema.validate(payload)
}

export const updateItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().required(),
    item_name: Joi.string().required(),
    description: Joi.string().required(),
    sku: Joi.string().required(),
    quantity: Joi.number().required(),
    category_id: Joi.string().required()
  })
  return schema.validate(payload)
}

export const deleteItemValidation = (payload: itemType) => {
  const schema = Joi.object({
    item_id: Joi.string().required(),
    item_name: Joi.string().required(),
    description: Joi.string().required(),
    sku: Joi.string().required(),
    quantity: Joi.number().required(),
    category_id: Joi.string().required()
  })
  return schema.validate(payload)
}
