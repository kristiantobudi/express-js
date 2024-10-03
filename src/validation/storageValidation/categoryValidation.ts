import Joi from 'joi'
import CategoriesType from '../../types/categoryType'

export const createCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().optional(),
    category_name: Joi.string().required(),
    description: Joi.string(),
    sequence_value: Joi.number().optional(),
    _id: Joi.string().optional()
  })
  return schema.validate(payload)
}

export const updateCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().optional(),
    category_name: Joi.string().min(1).required(),
    description: Joi.string()
  })
  return schema.validate(payload)
}

export const deleteCategoryValidation = (payload: CategoriesType) => {
  const schema = Joi.object({
    category_id: Joi.string().optional(),
    category_name: Joi.string().required(),
    description: Joi.string()
  })
  return schema.validate(payload)
}
