import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../../modules/products/controller/product.controller'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.post('/', requireUser, createProduct)
ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.put('/:id', requireAdmin, updateProduct)
ProductRouter.delete('/:id', requireAdmin, deleteProduct)
