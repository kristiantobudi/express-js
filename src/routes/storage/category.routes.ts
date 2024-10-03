import { Router } from 'express'
import { getCategory, createCategory, updateCategory, deleteCategory } from '../../modules/storage/controller/categoryController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const CategoryRouter: Router = Router()

CategoryRouter.get('/v1/categories', requireUser, getCategory)
CategoryRouter.post('/v1/categories', requireAdmin, createCategory)
CategoryRouter.get('/v1/categories/:id', requireUser, getCategory)
CategoryRouter.put('/v1/categories/:id', requireAdmin, updateCategory)
CategoryRouter.delete('/v1/categories/:id', requireAdmin, deleteCategory)
