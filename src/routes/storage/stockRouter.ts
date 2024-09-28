import { Router } from 'express'
import { createStock, deleteStock, getStock, updateStock } from '../../modules/storage/controller/stockController'

export const StockRouter: Router = Router()

StockRouter.post('/v1/stocks', createStock)
StockRouter.get('/v1/stocks', getStock)
StockRouter.get('/v1/stocks/:id', getStock)
StockRouter.put('/v1/stocks/:id', updateStock)
StockRouter.delete('/v1/stocks/:id', deleteStock)
