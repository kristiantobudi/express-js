/* eslint-disable object-shorthand */
/* eslint-disable new-cap */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-multi-spaces */
import { logger }  from '../utils/log/logger'
import userModel from '../models/auth/user.model'
import UserType from '../types/auth.type'

export const addUserToDB = async (payload: UserType) => {
    return await userModel.create(payload)
}

export const getUserFromDB = async () => {
    return await userModel
        .find()
        .then((data: any) => {
            return data
        })
        .catch((error: any) => {
            logger.info('Cannot get data from DB')
            logger.error(error)
        })
}

export const getUserByID = async (id: String) => {
    return await userModel.findOne({ user_id: id })
}

export const updateUserById = async (id: String, payload: UserType) => {
    return await userModel.findOneAndUpdate({
        user_id: id
    }, {
        $set: payload
    })
}

export const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email })
}