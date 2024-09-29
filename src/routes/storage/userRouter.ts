import { Router } from 'express'
import { createUser, createSession, updateUser, deleteSession, getUser } from '../../modules/storage/controller/userController'

export const UserRouter: Router = Router()

UserRouter.get('/v1/auth', getUser)
UserRouter.post('/v1/auth/login', createSession)
UserRouter.post('/v1/auth/register', createUser)
UserRouter.put('/v1/auth:id', updateUser)
UserRouter.delete('/v1/auth/logout', deleteSession)
