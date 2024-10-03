import { addstorageLocationToDB, getStorageLocationById, deleteStorageLocationById, updateStorageLocationById, getStorageLocationFromDB, getNextSequenceStorageLocation } from '../../../service/storageService/storageLocationService'
import { createStorageLocationValidation } from '../../../validation/storageValidation/storageLocationValidation'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createStorage = async (req: Request, res: Response) => {
  try {
    const nextStorageId = await getNextSequenceStorageLocation('storage_id')

    logger.debug(`Generated Storage_id: ${nextStorageId}`)

    req.body.storage_id = nextStorageId.toString()
    req.body._id = nextStorageId.toString()
    req.body.sequence_value = nextStorageId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createStorageLocationValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addstorageLocationToDB(value)
    logger.info('Success create new storage location')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Storage created successfully' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occured during storage creation:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occured during storage creation:', error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const getStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const storageLocation = await getStorageLocationById(id)
      if (storageLocation) {
        logger.info('Success get storage location')
        return res.status(200).send({ status: true, statusCode: 200, data: storageLocation })
      } else {
        logger.warn('Data not found for ID:', id)
        return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
      }
    } else {
      const storageLocation: any = await getStorageLocationFromDB()
      logger.info('Success get storage location')
      return res.status(200).send({ status: true, statusCode: 200, data: storageLocation })
    }
  } catch (error) {
    logger.error('ERR: storage - get = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const updateStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = createStorageLocationValidation(req.body)

  if (error) {
    logger.error('ERR: storage - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const updateStorageLocation = await updateStorageLocationById(id, value)
    if (updateStorageLocation) {
      logger.info('Success update location with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success', data: updateStorageLocation })
    } else {
      logger.warn('No Storage found for update with ID:', id)
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found for update' })
    }
  } catch (error) {
    logger.error('ERR: storage - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const deleteStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteStorageLocationById(id)

    if (result) {
      logger.info('Succes delete item with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete Storage success' })
    } else {
      logger.warn('Data not found for delete with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: Storage - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: 'Server error' })
  }
}
