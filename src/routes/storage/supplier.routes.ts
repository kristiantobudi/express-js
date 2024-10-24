import { Router } from 'express'
import { createSupplier, deleteSupplier, getSupplier, updateSupplier } from '../../modules/storage/controller/supplierController'

export const SupplierRouter: Router = Router()

SupplierRouter.get('/v1/suppliers', getSupplier)
SupplierRouter.get('/v1/suppliers/:id', getSupplier)
SupplierRouter.post('/v1/suppliers', createSupplier)
SupplierRouter.put('/v1/suppliers/:id', updateSupplier)
SupplierRouter.delete('/v1/suppliers/:id', deleteSupplier)
