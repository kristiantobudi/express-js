import { updateCategoryById, getCategoryfromDB, deleteCategoryById, getCategoryById, addCategoryfromDB } from '../../../service/storageService/categoryService'
import { updateCategoryValidation, createCategoryValidation } from '../../..//validation/storageValidation/categoryValidation'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { logger } from '../../..//utils/log/logger'

export const createCategory = async (req: Request, res: Response) => {
  req.body.category_id = uuidv4()
  const { error, value } = createCategoryValidation(req.body)

  if (error) {
    logger.error('ERR: category = create =', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await addCategoryfromDB(value)
    logger.info('Success create new category')
    return res.status(201).send({ stauts: true, statusCode: 201, message: 'Create category success' })
  } catch (error) {
    logger.error('ERR: category = create =', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getCategory = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const category = await getCategoryById(id)
    if (category) {
      logger.info('Success get category data')
      return res.status(200).send({ status: true, statusCode: 200, data: category })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, data: {} })
    }
  } else {
    const category: any = await getCategoryfromDB()
    logger.info('Success get category data')
    return res.status(200).send({ status: true, statusCode: 200, data: category })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateCategoryValidation(req.body)

  if (error) {
    logger.error('ERR: category - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    await updateCategoryById(id, value)
    logger.info('Success update category')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update category success' })
  } catch (error) {}
}

export const deleteCategory = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteCategoryById(id)

    if (result) {
      logger.info('Success delete category')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete category success' })
    } else {
      logger.info('Data not found')
      return res.status(400).send({ status: true, statusCode: 400, message: 'Data not found' })
    }
  } catch (error) {
    logger.error('ERR: category - delete = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
