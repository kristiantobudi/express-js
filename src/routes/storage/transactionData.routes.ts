import { Router } from 'express'
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from '../../modules/storage/controller/transcationController'
import { requireAdmin, requireUser } from '../../middleware/auth'

export const TransactionDataRouter: Router = Router()

TransactionDataRouter.get('/v1/transactions', requireUser, getTransaction)
TransactionDataRouter.get('/v1/transactions/:id', requireUser, getTransaction)
TransactionDataRouter.post('/v1/transactions', requireAdmin, createTransaction)
TransactionDataRouter.put('/v1/transactions/:id', requireAdmin, updateTransaction)
TransactionDataRouter.delete('/v1/transactions/:id', requireAdmin, deleteTransaction)
