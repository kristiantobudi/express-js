import { createStockValidation } from '../../../validation/storageValidation/stockValidation'
import { addStockToDB, deleteStockByIdLogic, getNextSequenceStock, getStockById, getStockFromDB, updateStockInDB } from '../../../service/storageService/stockService'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../../..//utils/log/logger'
import StockModel from '../../../models/strorageModel/stock/stockModel'

export const createStock = async (req: Request, res: Response) => {
  try {
    const nextStockId = await getNextSequenceStock('stock_id')

    logger.debug(`Generated sequence value: ${nextStockId}`)

    req.body.stock_id = nextStockId.toString()
    req.body._id = nextStockId.toString()
    req.body.sequence_value = nextStockId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createStockValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
    }

    await addStockToDB(value)
    logger.info('Success create new stock')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Create stock success'
    })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occurred during stock creation:', error.message)
      return res.status(500).send({
        status: false,
        statusCode: 500,
        message: 'Server error',
        error: error.message
      })
    } else {
      logger.error('Unknown error occurred during stock creation:', error)
      return res.status(500).send({
        status: false,
        statusCode: 500,
        message: 'Server error'
      })
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
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}

export const getStockData = async (req: Request, res: Response) => {
  try {
    const stockData = await StockModel.find({}).sort({ itemName: 1 })

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Stock data retrieved successfully',
      data: stockData
    })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occurred while fetching stock data:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occurred while fetching stock data')
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { itemName, quantity } = req.body

  try {
    const updatedStock = await updateStockInDB({
      id,
      itemName,
      quantity
    })

    return res.status(200).send({
      status: true,
      message: 'Stock updated successfully',
      data: updatedStock
    })
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: `Error updating stock: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

export const deleteStock = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const success = await deleteStockByIdLogic(id)

    if (success) {
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete stock success' })
    } else {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Stock not found' })
    }
  } catch (error) {
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error occurred during stock deletion' })
  }
}
