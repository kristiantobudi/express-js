import { logger } from '../../utils/log/logger'
import userModelManagement from '../../models/strorageModel/auth/userModelManagement'
import UserType from '../../types/userType'

export const createUserFromDB = async (payload: UserType) => {
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
