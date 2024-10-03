import { Router } from 'express'
import { createStorage, deleteStorageLocation, getStorageLocation, updateStorageLocation } from '../../modules/storage/controller/storageLocationController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const StorageLocationRouter: Router = Router()

StorageLocationRouter.post('/v1/storage-locations', requireAdmin, createStorage)
StorageLocationRouter.get('/v1/storage-locations', requireUser, getStorageLocation)
StorageLocationRouter.get('/v1/storage-locations/:id', requireUser, getStorageLocation)
StorageLocationRouter.put('/v1/storage-locations/:id', requireAdmin, updateStorageLocation)
StorageLocationRouter.delete('/v1/storage-locations/:id', requireAdmin, deleteStorageLocation)
