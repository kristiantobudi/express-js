import { Router } from 'express'
import { createItem, getItem, deleteItem, updateItem } from '../../modules/storage/controller/itemController'
// import { requireAdmin } from '../../middleware/auth'

export const ItemRouter: Router = Router()

ItemRouter.post('/v1/items', createItem)
ItemRouter.get('/v1/items', getItem)
ItemRouter.get('/v1/items/:id', getItem)
ItemRouter.put('/v1/items/:id', updateItem)
ItemRouter.delete('/v1/items/:id', deleteItem)
