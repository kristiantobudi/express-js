import Joi from 'joi'
import CategoriesType from '../../types/categoryType'

export const createCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().required(),
    category_name: Joi.string().required(),
    description: Joi.string()
  })
  return schema.validate(payload)
}

export const updateCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().required(),
    category_name: Joi.string().required(),
    description: Joi.string()
  })
  return schema.validate(payload)
}

export const deleteCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().required(),
    category_name: Joi.string().required(),
    description: Joi.string()
  })
  return schema.validate(payload)
}
