import { Request, Response } from 'express'
import { refreshSessionValidation, deleteSessionValidation, createUserStorageValidation, updateUserStorageValidation, createSessionValidation } from '../../../validation/storageValidation/userValidation'
import { createUserFromDB, findUserByUsername, getUserById, getUsers, updateUserById } from '../../../service/storageService/userService'
import { checkPassword, hashing } from '../../../utils/hashing'
import { signJWT, verifyJWT } from '../../../utils/jwt/jwt'
import { logger } from '../../../utils/log/logger'
import { v4 as uuidv4 } from 'uuid'

export const getUser = async (req: Request, res: Response) => {
  const { params: { id } } = req

  if (id) {
    const user = await getUserById(id)
    if (user) {
      logger.info('Success get user data')
      return res.status(200).send({ status: true, statusCode: 200, data: user })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, data: {} })
    }
  } else {
    const user: any = await getUsers()
    logger.info('Success get user data')
    return res.status(200).send({ status: true, statusCode: 200, data: user })
  }
}

export const createUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = createUserStorageValidation(req.body)
  if (error) {
    logger.error('ERR: user - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    value.password = `${hashing(value.password)}`
    await createUserFromDB(value)
    return res.status(201).send({ status: true, statusCode: 201, message: 'Create user success' })
  } catch (error: any) {
    logger.error('ERR: user - create = ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: error })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error('ERR: session - create =', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    const user: any = await findUserByUsername(value.username)

    if (!user) {
      logger.error(`ERR: session - create = user not found for username address ${value.username}`)
      return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid username or password' })
    }

    const isValid = checkPassword(value.password, user.password)

    if (!isValid) {
      logger.error(`ERR: session - create = Invalid password for username address ${value.username}`)
      return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid username or password' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '7d' })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Session created successfully', data: { accessToken, refreshToken } })
  } catch (error: any) {
    logger.error('ERR: session - create session =', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}

export const deleteSession = async (req: Request, res: Response) => {
  const { error } = deleteSessionValidation(req)

  if (error) {
    logger.error('ERR: session - delete = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    res.clearCookie('accessToken')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Session deleted successfully' })
  } catch (error: any) {
    logger.error('ERR: session - delete = ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal server error' })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    logger.error('ERR: session - refresh = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  } try {
    const { decoded }: any = verifyJWT(value.refreshToken)
    const user: any = await findUserByUsername(decoded.username)

    if (!user) return false
    const accessToken = signJWT({
      ...user
    }, {
      expiresIn: '1d'
    })
    return res.status(200).send({ status: true, statusCode: 200, message: 'Session created successfully', data: { accessToken } })
  } catch (error: any) {
    logger.error('ERR: session - refresh session = ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal server error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { params: { id } } = req
  const { error, value } = updateUserStorageValidation(req.body)

  if (error) {
    logger.error('ERR: user - update =  ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  if (value.passowrd) {
    value.password = hashing(value.password)
  } try {
    await updateUserById(id, value)
    logger.info('Success update user')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update user success' })
  } catch (error: any) {
    logger.error('ERR: user - update = ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}
