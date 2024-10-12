import stockModel from '../..//models/strorageModel/stock/stockModel'
import stockType from '../../types/stockType'
import { logger } from '../../utils/log/logger'

interface StockDocument extends Document {
  sequence_value: number
}

export const getNextSequenceStock = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await stockModel.findByIdAndUpdate<StockDocument>(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )

  if (!sequenceDocument) {
    throw new Error('Sequence not found')
  }
  return sequenceDocument.sequence_value
}

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

export const updateStockById = async (stockId: string, quantity: number) => {
  const updatedStock = await stockModel.findByIdAndUpdate(stockId, { quantity }, { new: true })
  return updatedStock
}

export const deleteStockById = async (id: string) => {
  try {
    const result = await deleteStockById(id)

    if (result) {
      logger.info(`Successfully deleted stock with ID: ${id}`)
      return true
    } else {
      logger.warn(`Stock with ID ${id} not found for deletion`)
      return false
    }
  } catch (error) {
    logger.error(`Error occurred while deleting stock with ID ${id}: ${error}`)
    throw new Error('Stock deletion failed')
  }
}

export const deleteStockByIdLogic = async (id: string) => {
  try {
    const result = await deleteStockById(id)

    if (result) {
      logger.info(`Successfully deleted stock with ID: ${id}`)
      return true
    } else {
      logger.warn(`Stock with ID ${id} not found for deletion`)
      return false
    }
  } catch (error) {
    logger.error(`Error occurred while deleting stock with ID ${id}: ${error}`)
    throw new Error('Stock deletion failed')
  }
}

export const updateStockInDB = async (id: string, quantity: number): Promise<any> => {
  const updatedStock = await stockModel.findOneAndUpdate(
    { _id: id },
    { $set: { quantity } },
    { new: true }
  )

  if (!updatedStock) {
    throw new Error('Stock not found')
  }

  return updatedStock
}

export const updateStockDirectly = async (id: string, quantity: number): Promise<any> => {
  return await updateStockInDB(id, quantity)
}
