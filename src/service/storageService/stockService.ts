import stockModel from '../..//models/strorageModel/stock/stockModel'
import stockType from '../../types/stockType'
import { logger } from '../../utils/log/logger'

export const addStockToDB = async (payload: stockType) => {
  return await stockModel.create(payload)
}

export const getStockFromDB = async () => {
  return await stockModel.find().then((data: any) => {
    return data
  }).catch((error: any) => {
    logger.info('Cannot get data from DB')
    logger.error(error)
  })
}

export const getStockById = async (id: string) => {
  return await stockModel.findOne({ item: id })
}

export const updateStockById = async (id: string, payload: stockType) => {
  return await stockModel.findOneAndUpdate({
    item: id
  }, {
    $set: payload
  })
}

export const deleteStockById = async (id: string) => {
  return await stockModel.findOneAndDelete({
    item: id
  })
}
