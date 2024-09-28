import { createStockValidation, updateStockValidation } from '../../../validation/storageValidation/stockValidation'
import { addStockToDB, deleteStockById, getStockById, getStockFromDB, updateStockById } from '../../../service/storageService/stockService'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createStock = async (req: Request, res: Response) => {
  req.body.item = uuidv4()
  const { error, value } = createStockValidation(req.body)

  if (error) {
    logger.error('ERR: stock - create = ', error.details[0].message)
  } try {
    await addStockToDB(value)
    logger.info('Success create new')
    return res.status(201).send({ status: true, statusCode: 200, message: error })
  } catch (error) {
    logger.error('ERR: stock - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  if (id) {
    const stock = await getStockById(id)
    if (stock) {
      logger.info('Success get item data')
      return res.status(200).send({ status: true, statusCode: 200, data: stock })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, data: {} })
    }
  } else {
    const stock: any = await getStockFromDB()
    logger.info('Success get stock data')
    return res.status(200).send({ status: true, statusCode: 200, data: stock })
  }
}

export const updateStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = updateStockValidation(req.body)

  if (error) {
    logger.error('ERR: stock - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await updateStockById(id, value)
    logger.info('Success update stock')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update stock success' })
  } catch (error) {}
}

export const deleteStock = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteStockById(id)

    if (result) {
      logger.info('Success delete stock')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete stock success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: stock - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
