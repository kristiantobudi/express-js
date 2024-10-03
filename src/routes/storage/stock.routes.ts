import { Router } from 'express'
import { createStock, deleteStock, getStock, updateStock } from '../../modules/storage/controller/stockController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const StockRouter: Router = Router()

StockRouter.post('/v1/stocks', requireAdmin, createStock)
StockRouter.get('/v1/stocks', requireUser, getStock)
StockRouter.get('/v1/stocks/:id', requireUser, getStock)
StockRouter.put('/v1/stocks/:id', requireAdmin, updateStock)
StockRouter.delete('/v1/stocks/:id', requireAdmin, deleteStock)
