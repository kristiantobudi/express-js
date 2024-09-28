import { Router } from 'express'
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from '../../modules/storage/controller/transcationController'

export const TransactionDataRouter: Router = Router()

TransactionDataRouter.get('/v1/transactions', getTransaction)
TransactionDataRouter.get('/v1/transactions/:id', getTransaction)
TransactionDataRouter.post('/v1/transactions', createTransaction)
TransactionDataRouter.put('/v1/transactions/:id', updateTransaction)
TransactionDataRouter.delete('/v1/transactions/:id', deleteTransaction)
