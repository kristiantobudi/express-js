import { Request, Response } from 'express'
import { logger } from '../../../utils/log/logger'
import { v4 as uuidv4 } from 'uuid'
import { addItemToDB, getItemsFromDB, updateItemById, getItemById, deleteItemById } from '../../../service/storageService/itemService'
import { createItemValidation, updateItemValidation } from '../../../validation/storageValidation/itemValidation'

export const createItem = async (req: Request, res: Response) => {
  req.body.item_id = uuidv4()
  const { error, value } = createItemValidation(req.body)

  if (error) {
    logger.error('ERR: item - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await addItemToDB(value)
    logger.info('Success create new')
    return res.status(201).send({ status: true, statusCode: 200, message: error })
  } catch (error) {
    logger.error('ERR: item - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getItem = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const item = await getItemById(id)
    if (item) {
      logger.info('Success get item data')
      return res.status(200).send({ status: true, statusCode: 200, data: item })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, message: 'Data Not Found', data: {} })
    }
  } else {
    const item: any = await getItemsFromDB()
    logger.info('Success get item data')
    return res.status(200).send({ status: true, statusCode: 200, data: item })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateItemValidation(req.body)

  if (error) {
    logger.error('ERR: item - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    await updateItemById(id, value)
    logger.info('Success update item')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success' })
  } catch (error) {}
}

export const deleteItem = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteItemById(id)

    if (result) {
      logger.info('Succes delete item')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete item success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: item - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
