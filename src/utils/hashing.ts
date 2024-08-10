/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/indent */
import bcrypt from 'bcrypt'

export const hashing = (password: string) => {
    return bcrypt.hashSync(password, 10)
}

export const checkPassword = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword)
}