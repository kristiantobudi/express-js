import { Router } from 'express'
import { createUser, createSession, updateUser, deleteSession, getUser } from '../../modules/storage/controller/userController'

export const UserRouter: Router = Router()

UserRouter.get('/v1/users', getUser)
UserRouter.post('/v1/users/login', createSession)
UserRouter.put('/v1/users/register/:id', createUser)
UserRouter.put('/v1/users:id', updateUser)
UserRouter.post('/v1/users/logout', deleteSession)
