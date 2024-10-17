import itemModel from '../../models/strorageModel/item/itemModel'
import StockModel from '../../models/strorageModel/stock/stockModel'
import stockType from '../../types/stockType'
import { logger } from '../../utils/log/logger'

interface StockDocument extends Document {
  sequence_value: number
}

interface StockUpdateData {
  id: string
  itemName: string
  quantity: number
  action?: 'stock_in' | 'stock_out' | 'adjustment'
}

export const getNextSequenceStock = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await StockModel.findByIdAndUpdate<StockDocument>(
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
  return await StockModel.create(payload)
}

export const getStockFromDB = async () => {
  return await StockModel.find().then((data: any) => {
    return data
  }).catch((error: any) => {
    logger.info('Cannot get data from DB')
    logger.error(error)
  })
}

export const getStockById = async (id: string) => {
  return await StockModel.findOne({ item: id })
}

export const updateStockById = async (stockId: string, quantity: number) => {
  const updatedStock = await StockModel.findByIdAndUpdate(stockId, { quantity }, { new: true })
  return updatedStock
}

export const deleteItemById = async (id: string) => {
  return await itemModel.findByIdAndDelete(id)
}

export const deleteStockByIdLogic = async (itemId: string) => {
  return await StockModel.findOneAndDelete({ itemId })
}

export const updateStockInDB = async (updateData: StockUpdateData): Promise<any> => {
  const { id, itemName, quantity } = updateData
  const updateFields: { itemName?: string, quantity: number } = { quantity }

  if (itemName !== undefined) {
    updateFields.itemName = itemName
  }

  const updatedStock = await StockModel.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true }
  )

  if (!updatedStock) {
    throw new Error('Stock not found')
  }

  return updatedStock
}

export const updateAggregatedStock = async (updateData: {
  id: string
  itemName: string
  quantity: number
  action: 'stock_in' | 'stock_out' | 'adjustment'
}) => {
  const { id, itemName, quantity, action } = updateData

  const existingStock = await StockModel.findOne({ item: id })

  if (existingStock) {
    let newQuantity = existingStock.quantity
    if (action === 'stock_in') {
      newQuantity += quantity
    } else if (action === 'stock_out') {
      newQuantity -= quantity
    } else {
      newQuantity = quantity
    }

    await StockModel.findOneAndUpdate(
      { item: id },
      {
        $set: {
          itemName,
          quantity: newQuantity
        },
        $push: {
          history: {
            action,
            quantity,
            date: new Date()
          }
        }
      },
      { new: true, upsert: true }
    )
  } else {
    // Create new stock entry
    await StockModel.create({
      item: id,
      itemName,
      quantity,
      history: [{
        action,
        quantity,
        date: new Date()
      }]
    })
  }
}

export const updateStockDirectly = async (updateData: StockUpdateData): Promise<any> => {
  const { id, itemName, quantity, action } = updateData

  if (action === 'stock_in') {
    const newStock = new StockModel({
      item: id,
      itemName,
      quantity,
      quantityChange: quantity,
      action: 'stock_in'
    })
    return await newStock.save()
  } else {
    const updatedStock = await StockModel.findOneAndUpdate(
      { item: id },
      {
        $set: { itemName, quantity },
        $inc: { quantityChange: quantity }
      },
      { new: true, upsert: true }
    )

    if (!updatedStock) {
      throw new Error('Stock not found and could not be created')
    }

    return updatedStock
  }
}
