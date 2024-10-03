import { Router } from 'express'
import { createItem, getItem, deleteItem, updateItem } from '../../modules/storage/controller/itemController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const ItemRouter: Router = Router()

ItemRouter.post('/v1/items', requireAdmin, createItem)
ItemRouter.get('/v1/items', requireUser, getItem)
ItemRouter.get('/v1/items/:id', requireUser, getItem)
ItemRouter.put('/v1/items/:id', requireUser, updateItem)
ItemRouter.delete('/v1/items/:id', requireUser, deleteItem)
