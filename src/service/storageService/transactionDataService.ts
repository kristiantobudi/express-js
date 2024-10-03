import transactionDataType from '../../types/transactionDataType'
import transactionDataModel from '../../models/strorageModel/transaction/transactionModel'
import { logger } from '../../utils/log/logger'

interface TransactionDataDocument extends Document {
  sequence_value: number
}

export const getNextSequenceTransactionData = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await transactionDataModel.findByIdAndUpdate<TransactionDataDocument>(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )

  if (!sequenceDocument) {
    throw new Error('Sequence not found')
  }
  return sequenceDocument.sequence_value
}

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
