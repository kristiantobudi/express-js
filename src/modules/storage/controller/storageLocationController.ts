import { addstorageLocationToDB, getStorageLocationById, deleteStorageLocationById, updateStorageLocationById, getStorageLocationFromDB } from '../../../service/storageService/storageLocationService'
import { createStorageLocationValidation } from '../../../validation/storageValidation/storageLocationValidation'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createStorage = async (req: Request, res: Response) => {
  req.body.storage_id = uuidv4()
  const { error, value } = createStorageLocationValidation(req.body)

  if (error) {
    logger.error('ERR: storage - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    await addstorageLocationToDB(value)
    logger.info('Success create new storage location')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Storage created successfully' })
  } catch (error) {
    logger.error('ERR: storage - create = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}

export const getStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  if (id) {
    const storageLocation = await getStorageLocationById(id)
    if (storageLocation) {
      logger.info('Success get storage location')
      return res.status(200).send({ status: true, statusCode: 200, data: storageLocation })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, data: {} })
    }
  } else {
    const storageLocation: any = await getStorageLocationFromDB()
    logger.info('Success get storage location')
    return res.status(200).send({ status: true, statusCode: 200, data: storageLocation })
  }
}

export const updateStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = createStorageLocationValidation(req.body)

  if (error) {
    logger.error('ERR: storage - update = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await updateStorageLocationById(id, value)
    logger.info('Success update item')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success' })
  } catch (error) {}
}

export const deleteStorageLocation = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteStorageLocationById(id)

    if (result) {
      logger.info('Success delete Storage')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete Storage success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: Storage - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
