import { logger } from '../../utils/log/logger'
import userModelManagement from '../../models/strorageModel/auth/userModelManagement'
import UserType from '../../types/userType'
import RegisterType from '../../types/registerType'

export const createUserFromDB = async (payload: RegisterType) => {
  return await userModelManagement.create(payload)
}

export const getUsers = async () => {
  return await userModelManagement
    .find()
    .then((data: any) => {
      return data
    })
    .catch((error: any) => {
      logger.info('Cannot get data from DB')
      logger.error(error)
    })
}

export const getUserById = async (id: string) => {
  return await userModelManagement.findOne({ user_id: id })
}

export const updateUserById = async (id: string, payload: UserType) => {
  return await userModelManagement.findOneAndUpdate({
    user_id: id
  }, {
    $set: payload
  })
}

export const findUserByUsername = async (username: string) => {
  try {
    const user = await userModelManagement.findOne({ username })

    if (!user) {
      logger.info(`User with username ${username} not found`)
    }
    return user
  } catch (error) {
    logger.error(`Error finding user with username ${username}: ${error}`)
    throw new Error('Error retrieving user')
  }
}
