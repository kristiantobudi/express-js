import { Request, Response } from 'express'
import { logger } from '../../../utils/log/logger'
import { addItemToDB, getItemsFromDB, getItemById, deleteItemById, getNextSequenceValue } from '../../../service/storageService/itemService'
import { createItemValidation, updateItemValidation } from '../../../validation/storageValidation/itemValidation'
import { deleteStockByIdLogic, updateAggregatedStock } from '../../../service/storageService/stockService'
import itemModel from '../../../models/strorageModel/item/itemModel'

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

    const newItem = await addItemToDB(value)

    await updateAggregatedStock({
      id: newItem._id.toString(),
      itemName: newItem.item_name,
      quantity: newItem.quantity || 0,
      action: 'stock_in'
    })

    logger.info('Successfully created new item and updated stock')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create item and update stock success' })
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

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await getItemsFromDB()
    logger.info('Successfully retrieved all items')
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Items retrieved successfully',
      data: items
    })
  } catch (error) {
    logger.error('Error while getting all items:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getitemById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const item = await getItemById(id)
    if (item) {
      logger.info(`Successfully retrieved item with ID: ${id}`)
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Item retrieved successfully',
        data: item
      })
    } else {
      logger.warn(`Item not found with ID: ${id}`)
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'Item not found'
      })
    }
  } catch (error) {
    logger.error(`Error while getting item with ID ${id}:`, error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const { error, value } = updateItemValidation(updateData)
    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
    }

    const updatedItem = await itemModel.findByIdAndUpdate(id, value, { new: true, runValidators: true })

    if (!updatedItem) {
      logger.error(`Item not found with id: ${id}`)
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'Item not found'
      })
    }

    if ('quantity' in value) {
      await updateAggregatedStock({
        id: updatedItem._id,
        itemName: updatedItem.item_name,
        quantity: updatedItem.quantity,
        action: 'adjustment'
      })
    }

    logger.info(`Successfully updated item with id: ${id}`)
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Item updated successfully',
      data: updatedItem
    })
  } catch (error) {
    logger.error('Error in updateItem:', error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedItem = await deleteItemById(id)

    if (!deletedItem) {
      logger.warn(`Item not found for deletion with ID: ${id}`)
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'Item not found'
      })
    }

    let stockDeleted = await deleteStockByIdLogic(id)
    try {
      stockDeleted = await deleteStockByIdLogic(id)
    } catch (stockError) {
      logger.error(`Failed to delete stock for item with ID: ${id}`, stockError)
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: 'Stock deletion failed',
        error: stockError instanceof Error ? stockError.message : 'Unknown stock deletion error'
      })
    }

    logger.info(`Successfully deleted item with ID: ${id}. Stock ${stockDeleted ? 'was' : 'was not'} found and deleted.`)
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Item deleted successfully',
      stockDeleted
    })
  } catch (error) {
    logger.error(`Error during item deletion with ID ${id}:`, error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
