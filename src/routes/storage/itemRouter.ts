import { Router } from 'express'
import { createItem, deleteItemById, getItemById, getItems, updateItemById } from '../../service/storageService/itemService'

export const ItemRouter: Router = Router()

ItemRouter.post('/v1/storage/items', createItem)
ItemRouter.get('/v1/storage/items', getItems)
ItemRouter.get('/v1/storage/items/:id', getItemById)
ItemRouter.put('/v1/storage/items/:id', updateItemById)
ItemRouter.delete('/v1/storage/items/:id', deleteItemById)
