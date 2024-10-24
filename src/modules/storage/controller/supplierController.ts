import { logger } from '../../../utils/log/logger'
import { addSupplierToDB, deleteSupplierById, getNextSequenceSupplier, getSupplierById, getSupplierFromDB, updateSupplierById } from '../../../service/storageService/supplierService'
import { createSupplierValidation } from '../../../validation/storageValidation/supplierValidation'
import { Request, Response } from 'express'

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const nextSupplierId = await getNextSequenceSupplier('supplier_id')

    logger.debug(`Generated Storage_id: ${nextSupplierId}`)

    req.body.supplier_id = nextSupplierId.toString()
    req.body._id = nextSupplierId.toString()
    req.body.sequence_value = nextSupplierId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createSupplierValidation(req.body)

    if (error) {
      logger.error('Validation error:', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addSupplierToDB(value)
    logger.info('Success create new supplier')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Supplier created successfully' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occured during supplier creation:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error', error: error.message })
    } else {
      logger.error('Unknown error occured during supplier creation:', error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
    }
  }
}

export const getSupplier = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const supplier = await getSupplierById(id)
      if (supplier) {
        logger.info('Success get supplier')
        return res.status(200).send({ status: true, statusCode: 200, data: supplier })
      } else {
        logger.warn('Data not found for get supplier with ID:', id)
        return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
      }
    } else {
      const supplier: any = await getSupplierFromDB()
      logger.info('Success get supplier')
      return res.status(200).send({ status: true, statusCode: 200, data: supplier })
    }
  } catch (error) {
    logger.error('ERR: supplier - get = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const updateSupplier = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = createSupplierValidation(req.body)

  if (error) {
    logger.error('Validation error:', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    if (id) {
      const updateSupplier = await updateSupplierById(id, value)
      if (updateSupplier) {
        logger.info('Success update supplier with ID:', id)
        return res.status(200).send({ status: true, statusCode: 200, message: 'Supplier updated successfully' })
      } else {
        logger.warn('Data not found for update supplier with ID:', id)
        return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found for update' })
      }
    } else {
      logger.warn('No supplier found for update with ID:', id)
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found for update' })
    }
  } catch (error) {
    logger.error('ERR: supplier - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const deleteSupplier = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteSupplierById(id)

    if (result) {
      logger.info('Success delete supplier with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Supplier deleted successfully' })
    } else {
      logger.warn('Data not found for delete supplier with ID:', id)
      return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: supplier - delete = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}
