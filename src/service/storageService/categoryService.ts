import { logger } from '../../utils/log/logger'
import categoryModel from '../../models/strorageModel/categories/categoryModel'
import CategoriesType from '../../types/categoryType'

export const addCategoryfromDB = async (payload: CategoriesType) => {
  return await categoryModel.create(payload)
}

export const getCategoryfromDB = async () => {
  return await categoryModel
    .find()
    .then((data: any) => {
      return data
    })
    .catch((error: any) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getCategoryById = async (id: string) => {
  return await categoryModel.findOne({
    category_id: id
  })
}

export const updateCategoryById = async (id: string, payload: CategoriesType) => {
  return await categoryModel.findOneAndUpdate({
    category_id: id
  }, {
    $set: payload
  })
}

export const deleteCategoryById = async (id: string) => {
  return await categoryModel.findOneAndDelete({
    category_id: id
  })
}
