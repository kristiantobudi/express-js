import transactionDataType from '../../types/transactionDataType'
import transactionDataModel from '../../models/strorageModel/transaction/transactionModel'
import { logger } from '../../utils/log/logger'

export const addTransactionDataToDB = async (payload: transactionDataType) => {
  return await transactionDataModel.create(payload)
}

export const getTransactionDataFromDB = async () => {
  return await transactionDataModel.find().then((data: any) => {
    return data
  }).catch((error: any) => {
    logger.info('Cannot get data from DB')
    logger.error(error)
  })
}

export const getTransactionById = async (id: string) => {
  return await transactionDataModel.find({ item: id })
}

export const updateTransactionById = async (id: string, payload: transactionDataType) => {
  return await transactionDataModel.findOneAndUpdate({ item: id }, { $set: payload })
}

export const deleteTransactionById = async (id: string) => {
  return await transactionDataModel.findOneAndDelete({ item: id })
}
