import { addTransactionDataToDB, deleteTransactionById, getTransactionById, getTransactionDataFromDB, updateTransactionById } from '../../../service/storageService/transactionDataService'
import { createTransactionDataValidation, updateTransactionDataValidation } from '../../../validation/storageValidation/transactionValidation'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createTransaction = async (req: Request, res: Response) => {
  req.body.item = uuidv4()
  const { error, value } = createTransactionDataValidation(req.body)

  if (error) {
    logger.error('ERR: transaction - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await addTransactionDataToDB(value)
    logger.info('Success create new')
    return res.status(201).send({ status: true, statusCode: 200, message: error })
  } catch (error) {
    logger.error('ERR: transaction - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req

  if (id) {
    const transaction = await getTransactionById(id)
    if (transaction) {
      logger.info('Success get item data')
      return res.status(200).send({ status: true, statusCode: 200, data: transaction })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, data: {} })
    }
  } else {
    const transaction: any = await getTransactionDataFromDB()
    logger.info('Success get item data')
    return res.status(200).send({ status: true, statusCode: 200, data: transaction })
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req
  const { error, value } = updateTransactionDataValidation(req.body)

  if (error) {
    logger.error('ERR: transaction - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await updateTransactionById(id, value)
    logger.info('Success update item')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success' })
  } catch (error) {}
}

export const deleteTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteTransactionById(id)

    if (result) {
      logger.info('Success delete transaction')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete transaction success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: transaction - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
