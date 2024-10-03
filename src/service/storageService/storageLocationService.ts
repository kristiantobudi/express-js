import storageLocationModel from '../../models/strorageModel/location/locationModel'
import storageTypes from '../../types/locationStorageType'
import { logger } from '../../utils/log/logger'

interface StorageLocationDocument extends Document {
  sequence_value: number
}

export const getNextSequenceStorageLocation = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await storageLocationModel.findByIdAndUpdate<StorageLocationDocument>(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )

  if (!sequenceDocument) {
    throw new Error('Sequence not found')
  }
  return sequenceDocument.sequence_value
}

export const addstorageLocationToDB = async (payload: storageTypes) => {
  return await storageLocationModel.create(payload)
}

export const getStorageLocationFromDB = async () => {
  return await storageLocationModel.find().then((data: any) => {
    return data
  }).catch((error: any) => {
    logger.info('Cannot get data from DB')
    logger.error(error)
  })
}

export const getStorageLocationById = async (id: string) => {
  return await storageLocationModel.findOne({ item: id })
}

export const updateStorageLocationById = async (id: string, payload: storageTypes) => {
  return await storageLocationModel.findOneAndUpdate({
    item: id
  }, {
    $set: payload
  })
}

export const deleteStorageLocationById = async (id: string) => {
  return await storageLocationModel.findOneAndDelete({
    item: id
  })
}
