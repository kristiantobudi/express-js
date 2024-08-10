/* eslint-disable eol-last */
import Joi from 'joi'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    product_name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.number().allow('', null),
    description: Joi.string().allow('', null),
    status: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    size: Joi.number().allow('', null),
    description: Joi.string().allow('', null),
    status: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const deleteProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    size: Joi.number().allow('', null),
    description: Joi.string().allow('', null),
    status: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}