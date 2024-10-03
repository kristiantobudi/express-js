import { addTransactionDataToDB, deleteTransactionById, getNextSequenceTransactionData, getTransactionById, getTransactionDataFromDB, updateTransactionById } from '../../../service/storageService/transactionDataService'
import { createTransactionDataValidation, updateTransactionDataValidation } from '../../../validation/storageValidation/transactionValidation'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

// export const createTransaction = async (req: Request, res: Response) => {
//   req.body.item = uuidv4()
//   const { error, value } = createTransactionDataValidation(req.body)

//   if (error) {
//     logger.error('ERR: transaction - create = ', error.details[0].message)
//     return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
//   } try {
//     await addTransactionDataToDB(value)
//     logger.info('Success create new')
//     return res.status(201).send({ status: true, statusCode: 200, message: error })
//   } catch (error) {
//     logger.error('ERR: transaction - create = ', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const nextTransactionId = await getNextSequenceTransactionData('transaction_id')

    logger.debug(`Generated transaction_id: ${nextTransactionId}`)

    req.body.transaction_id = nextTransactionId.toString()
    req.body._id = nextTransactionId.toString()
    req.body.sequence_value = nextTransactionId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createTransactionDataValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addTransactionDataToDB(value)
    logger.info('Successfully created new transaction')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create transaction success' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occurred during transaction creation:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occurred during transaction creation:', error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const getTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const transaction = await getTransactionById(id)
      if (transaction) {
        logger.info('Success get transaction data')
        return res.status(200).send({ status: true, statusCode: 200, data: transaction })
      } else {
        logger.warn('Data not found for get with ID:', id)
        return res.status(404).send({ status: true, statusCode: 404, data: {} })
      }
    } else {
      const transaction: any = await getTransactionDataFromDB()
      logger.info('Success get transaction data')
      return res.status(200).send({ status: true, statusCode: 200, data: transaction })
    }
  } catch (error) {
    logger.error('ERR: transaction - get = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req
  const { error, value } = updateTransactionDataValidation(req.body)

  if (error) {
    logger.error('ERR: transaction - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    const updateTransaction = await updateTransactionById(id, value)
    if (updateTransaction) {
      logger.info('Success update transaction data with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update transaction success' })
    } else {
      logger.warn('Data not found for update with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: transaction - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteTransactionById(id)

    if (result) {
      logger.info('Success delete transaction')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete transaction success' })
    } else {
      logger.warn('Data not found for delete with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: transaction - delete = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}
