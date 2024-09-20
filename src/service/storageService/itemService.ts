import { logger } from '../../utils/log/logger'
import itemModel from '../../models/strorageModel/item/itemModel'
import itemType from '../../types/itemType'

export const addItemToDB = async (payload: itemType) => {
  return await itemModel.create(payload)
}

export const getItemsFromDB = async () => {
  return await itemModel
    .find()
    .then((data: any) => {
      return data
    })
    .catch((error: any) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getItemById = async (id: string) => {
  return await itemModel.findOne({ item_id: id })
}

export const updateItemById = async (id: string, payload: itemType) => {
  return await itemModel.findOneAndUpdate({
    item_id: id
  }, {
    $set: payload
  })
}

export const deleteItemById = async (id: string) => {
  return await itemModel.findOneAndDelete({
    item_id: id
  })
}
