import { Router } from 'express'
import { createItem, getitemById, deleteItem, updateItem, getAllItems } from '../../modules/storage/controller/itemController'
// import { requireAdmin } from '../../middleware/auth'

export const ItemRouter: Router = Router()

ItemRouter.post('/v1/items', createItem)
ItemRouter.get('/v1/items', getAllItems)
ItemRouter.get('/v1/items/:id', getitemById)
ItemRouter.put('/v1/items/:id', updateItem)
ItemRouter.delete('/v1/items/:id', deleteItem)
