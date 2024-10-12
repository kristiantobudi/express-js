import Joi from 'joi'
import stockType from '../../types/stockType'

const stockSchema = Joi.object({
  item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  action: Joi.string().valid('stock_in', 'stock_out', 'adjustment').required()
})

export const createStockValidation = (payload: stockType) => {
  return stockSchema.validate(payload)
}

export const updateStockValidation = (payload: stockType) => {
  return stockSchema.validate(payload)
}

export const deleteStockValidation = (payload: stockType) => {
  const deleteSchema = Joi.object({
    item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
  return deleteSchema.validate(payload)
}
