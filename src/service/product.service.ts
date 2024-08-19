/* eslint-disable eol-last */
import { logger } from '../utils/log/logger'
import productModel from '../models/product/product.model'
import ProductType from '../types/product.type'

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data: any) => {
      return data
    })
    .catch((error: any) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getProductById = async (id: String) => {
  return await productModel.findOne({ product_id: id })
}

export const updateProductById = async (id: String, payload: ProductType) => {
  return await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    { $set: payload }
  )
}

export const deleteProductById = async (id: String) => {
  return await productModel.findOneAndDelete({
    product_id: id
  })
}