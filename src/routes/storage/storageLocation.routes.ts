import { Router } from 'express'
import { createStorage, deleteStorageLocation, getStorageLocation, updateStorageLocation } from '../../modules/storage/controller/storageLocationController'

export const StorageLocationRouter: Router = Router()

StorageLocationRouter.post('/v1/storage-locations', createStorage)
StorageLocationRouter.get('/v1/storage-locations', getStorageLocation)
StorageLocationRouter.get('/v1/storage-locations/:id', getStorageLocation)
StorageLocationRouter.put('/v1/storage-locations/:id', updateStorageLocation)
StorageLocationRouter.delete('/v1/storage-locations/:id', deleteStorageLocation)
