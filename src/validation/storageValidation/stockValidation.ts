import Joi from 'joi'
import stockType from '../../types/stockType'

export const createStockValidation = (payload: stockType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    quantity_change: Joi.number().required(),
    reason: Joi.string().required()
  })
  return schema.validate(payload)
}

export const updateStockValidation = (payload: stockType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    quantity_change: Joi.number().required(),
    reason: Joi.string().required()
  })
  return schema.validate(payload)
}

export const deleteStockValidation = (payload: stockType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    quantity_change: Joi.number().required(),
    reason: Joi.string().required()
  })
  return schema.validate(payload)
}
