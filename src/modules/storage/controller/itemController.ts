import { Request, Response } from 'express'
import { logger } from '../../../utils/log/logger'
import { addItemToDB, getItemsFromDB, updateItemById, getItemById, deleteItemById, getNextSequenceValue } from '../../../service/storageService/itemService'
import { createItemValidation, updateItemValidation } from '../../../validation/storageValidation/itemValidation'

export const createItem = async (req: Request, res: Response) => {
  try {
    const nextItemId = await getNextSequenceValue('item_id')

    logger.debug(`Generated item_id: ${nextItemId}`)

    req.body.item_id = nextItemId.toString()
    req.body._id = nextItemId.toString()
    req.body.sequence_value = nextItemId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createItemValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addItemToDB(value)
    logger.info('Successfully created new item')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create item success' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occurred during item creation:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occurred during item creation')
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const getItem = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const item = await getItemById(id)
      if (item) {
        logger.info('Success get item data')
        return res.status(200).send({ status: true, statusCode: 200, data: item })
      } else {
        logger.warn('Data not found for ID:', id)
        return res.status(404).send({ status: false, statusCode: 404, message: 'Data Not Found', data: {} })
      }
    } else {
      const item = await getItemsFromDB()
      logger.info('Success get all items')
      return res.status(200).send({ status: true, statusCode: 200, data: item })
    }
  } catch (error) {
    logger.error('ERR: item - get = ', error)
    return res.status(500).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = updateItemValidation(req.body)

  if (error) {
    logger.error('ERR: item - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const updatedItem = await updateItemById(id, value)
    if (updatedItem) {
      logger.info('Success update item with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success', data: updatedItem })
    } else {
      logger.warn('No item found for update with ID:', id)
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found for update' })
    }
  } catch (error) {
    logger.error('ERR: item - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteItemById(id)

    if (result) {
      logger.info('Success delete item with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete item success' })
    } else {
      logger.warn('Data not found for delete with ID:', id)
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: item - delete = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}
