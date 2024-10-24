import { SupplierType } from '../../types/supplier.type'
import SupplierModel from '../../models/strorageModel/supplier/supplierModel'
import { logger } from '../../utils/log/logger'

interface SupplierDocument extends Document {
  sequence_value: number
}

export const getNextSequenceSupplier = async (sequenceName: string): Promise<number> => {
  const sequenceDocument = await SupplierModel.findByIdAndUpdate<SupplierDocument>(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )

  if (!sequenceDocument) {
    throw new Error('Sequence not found')
  }
  return sequenceDocument.sequence_value
}

export const addSupplierToDB = async (payload: SupplierType) => {
  return await SupplierModel.create(payload)
}

export const getSupplierFromDB = async () => {
  return await SupplierModel.find().then((data: any) => {
    return data
  }).catch((error: any) => {
    logger.info('Cannot get data from DB')
    logger.error(error)
  })
}

export const getSupplierById = async (id: string) => {
  return await SupplierModel.findById(id)
}

export const updateSupplierById = async (id: string, payload: SupplierType) => {
  return await SupplierModel.findByIdAndUpdate(id, payload)
}

export const deleteSupplierById = async (id: string) => {
  return await SupplierModel.findByIdAndDelete({
    _id: id
  })
}
