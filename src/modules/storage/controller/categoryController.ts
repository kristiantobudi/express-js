import { updateCategoryById, getCategoryfromDB, deleteCategoryById, getCategoryById, addCategoryfromDB, getNextSequenceCategories } from '../../../service/storageService/categoryService'
import { updateCategoryValidation, createCategoryValidation } from '../../..//validation/storageValidation/categoryValidation'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const nextCategoryId = await getNextSequenceCategories('category_id')

    if (!nextCategoryId) {
      return res.status(500).send({
        status: false,
        statusCode: 500,
        message: 'Failed to generate category ID'
      })
    }

    logger.debug(`nextCategoryId: ${nextCategoryId}`)

    req.body.category_id = nextCategoryId.toString()
    req.body._id = nextCategoryId.toString()
    req.body.sequence_value = nextCategoryId

    logger.debug('Request body before validation:', req.body)

    const { error, value } = createCategoryValidation(req.body)

    if (error) {
      logger.error('ERR: category = create =', error.details[0].message)
      return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    await addCategoryfromDB(value)
    logger.info('Success create new category')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create category success' })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error occurred during creating category:', error.message)
      return res.status(500).send({ status: false, statusCode: 500, message: error.message })
    } else {
      logger.error('Unknown error occurred during creating category:', error)
      return res.status(500).send({ status: false, statusCode: 500, message: 'Unknown error occurred during creating category' })
    }
  }
}

export const getCategory = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    if (id) {
      const category = await getCategoryById(id)
      if (category) {
        logger.info('Success get category data')
        return res.status(200).send({ status: true, statusCode: 200, data: category })
      } else {
        logger.warn('Data not found for get category with ID:', id)
        return res.status(404).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
      }
    } else {
      const category = await getCategoryfromDB()
      logger.info('Success get category data')
      return res.status(200).send({ status: true, statusCode: 200, data: category })
    }
  } catch (error) {
    logger.error('ERR: category - get = ', error)
    return res.status(500).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const { params: { id } } = req

  const { error, value } = updateCategoryValidation(req.body)

  if (error) {
    logger.error('ERR: category - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const updateCategory = await updateCategoryById(id, value)
    if (updateCategory) {
      logger.info('Success update category item with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update item success', data: updateCategory })
    } else {
      logger.warn('No category found for update with ID:', id)
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found for update' })
    }
  } catch (error) {
    logger.error('ERR: category - update = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Server error' })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  const { params: { id } } = req

  try {
    const result = await deleteCategoryById(id)

    if (result) {
      logger.info('Success delete category item with ID:', id)
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete category success' })
    } else {
      logger.warn('Data not found for delete with ID:', id)
      return res.status(400).send({ status: true, statusCode: 400, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: category - delete = ', error)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}
