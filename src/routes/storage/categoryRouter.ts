import { Router } from 'express'
import { getCategory, createCategory, updateCategory, deleteCategory } from '../../modules/storage/controller/categoryController'

export const CategoryRouter: Router = Router()

CategoryRouter.get('/v1/categories', getCategory)
CategoryRouter.post('/v1/categories', createCategory)
CategoryRouter.get('/v1/categories/:id', getCategory)
CategoryRouter.put('/v1/categories/:id', updateCategory)
CategoryRouter.delete('/v1/categories/:id', deleteCategory)
