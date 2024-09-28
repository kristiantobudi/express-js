import Joi from 'joi'
import transactionDataType from '../../types/transactionDataType'

export const createTransactionDataValidation = (payload: transactionDataType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    action: Joi.string().required(),
    quantity: Joi.number().required()
  })
  return schema.validate(payload)
}

export const updateTransactionDataValidation = (payload: transactionDataType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    action: Joi.string().required(),
    quantity: Joi.number().required()
  })
  return schema.validate(payload)
}

export const deleteTransactionDataValidation = (payload: transactionDataType) => {
  const schema = Joi.object({
    item: Joi.string().required(),
    user: Joi.string().required(),
    action: Joi.string().required(),
    quantity: Joi.number().required()
  })
  return schema.validate(payload)
}
