import { createStockValidation, updateStockValidation } from '../../../validation/storageValidation/stockValidation'
import { addStockToDB, deleteStockById, getNextSequenceStock, getStockById, getStockFromDB, updateStockById } from '../../../service/storageService/stockService'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createStock = async (req: Request, res: Response) => {
  try {
    const nextItemId = await getNextSequenceStock('stock_id')

    logger.debug(`Generated item_id: ${nextItemId}`)

    req.body.stock_id = nextItemId.toString()
    req.body._id = nextItemId.toString()
    req.body.sequence_value = nextItemId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createStockValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addStockToDB(value)
    logger.info('Success create new stock')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create stock success' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occured during stock creation:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occured during stock creation:', error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const getStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const stock = await getStockById(id)
      if (stock) {
        logger.info('Success get item data')
        return res.status(200).send({ status: true, statusCode: 200, data: stock })
      } else {
        logger.warn('Data not found for get item with ID:', id)
        return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
      }
    } else {
      const stock = await getStockFromDB()
      logger.info('Success get stock data')
      return res.status(200).send({ status: true, statusCode: 200, data: stock })
    }
  } catch (error) {
    logger.error('ERR: stock - get = ', error)
    return res.status(500).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = updateStockValidation(req.body)

  if (error) {
    logger.error('ERR: stock - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const updateStock = await updateStockById(id, value)
    if (updateStock) {
      logger.info('Success update stock with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update stock success' })
    } else {
      logger.warn('No data found for update stock with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: stock - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const deleteStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteStockById(id)

    if (result) {
      logger.info('Success delete stock')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete stock success' })
    } else {
      logger.warn('Data not found for delete with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: stock - delete = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}
