/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/indent */
import { Request, Response } from 'express'
import { logger } from '../../../utils/log/logger'
import { createSessionValidation, createUserValidation, deleteSessionValidation, refreshSessionValidation, updateUserValidation } from '../../../validation/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { addUserToDB, findUserByEmail, updateUserById } from '../../../service/user.service'
import { checkPassword, hashing } from '../../../utils/hashing'
import { signJWT, verifyJWT } from '../../../utils/jwt/jwt'

export const createUser = async (req: Request, res: Response) => {
    req.body.user_id = uuidv4()
    const { error, value }  = createUserValidation(req.body)

    if (error) {
        logger.error('ERR: user - create = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    }

    try {
        value.password = `${hashing(value.password)}`
        await addUserToDB(value)
        return res.status(201).json({ status: true, statusCode: 201, message: 'Add user success' })
    } catch (error: any) {
        logger.error('ERR: user - create = ', error.message)
        return res.status(500).send({ status: false, statusCode: 500, message: error })
    }
}

export const createSession = async (req: Request, res: Response) => {
    const { error, value } = createSessionValidation(req.body);
    
    if (error) {
        logger.error('ERR: session - create = ', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }

    try {
        const user: any = await findUserByEmail(value.email);

        if (!user) {
            logger.error(`ERR: session - create = User not found for email ${value.email}`);
            return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid email or password' });
        }

        const isValid = checkPassword(value.password, user.password);

        if (!isValid) {
            logger.error(`ERR: session - create = Invalid password for email ${value.email}`);
            return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid email or password' });
        }

        const accessToken = signJWT({ ...user }, { expiresIn: '1d' });

        const refreshToken = signJWT({ ...user }, { expiresIn: '7d' });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Session created successfully', data: { accessToken, refreshToken } })
    } catch (error: any) {
        logger.error('ERR: session - create session = ', error.message);
        return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' });
    }
}

export const deleteSession = async (req: Request, res: Response) => {
    const { error, value } = deleteSessionValidation(req.body);

    if (error) {
        logger.error('ERR: session - delete = ', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }

    try {
        const { decoded }: any = verifyJWT(value.accessToken);
        const user: any = await findUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).send({ status: false, statusCode: 404, message: 'User not found' });
        }

        return res.status(200).send({ status: true, statusCode: 200, message: 'Session deleted successfully' });
    } catch (error: any) {
        logger.error('ERR: session - delete = ', error.message);
        return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' });
    }
}

export const refreshSession = async (req: Request, res: Response) => {
    const { error, value } = refreshSessionValidation(req.body);

    if (error) {
        logger.error('ERR: session - refresh = ', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }

    try {
        const { decoded }: any = verifyJWT(value.refresToken);
        const user: any = await findUserByEmail(decoded.email);
        if(!user) return false
        const accessToken = signJWT(
            {
                ...user
            },
            {
                expiresIn: '1d'
            }
        )
        return res.status(200).send({ status: true, statusCode: 200, message: 'Session created successfully', data: { accessToken } })
    } catch (error: any) {
        logger.error('ERR: session - refresh session = ', error.message);
        return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { params: { id } } = req
    const { error, value } = updateUserValidation(req.body)

    if (error) {
        logger.error('ERR: user - update = ', error.details[0].message)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    } 

    if (value.password) {
        value.password = hashing(value.password)
    }
    
    try {
        await updateUserById(id, value)
        logger.info('Success update user')
        return res.status(200).send({ status: true, statusCode: 200, message: 'Update user success' })
    } catch (error: any) {
        logger.error('ERR: user - update = ', error.message)
        return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
    }
}

