import { Router } from 'express'
import { createItem, getItem, deleteItem, updateItem } from '../../modules/storage/controller/itemController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const ItemRouter: Router = Router()

ItemRouter.post('/v1/items', requireAdmin, createItem)
ItemRouter.get('/v1/items', requireAdmin, getItem)
ItemRouter.get('/v1/items/:id', requireAdmin, getItem)
ItemRouter.put('/v1/items/:id', requireAdmin, updateItem)
ItemRouter.delete('/v1/items/:id', requireAdmin, deleteItem)
