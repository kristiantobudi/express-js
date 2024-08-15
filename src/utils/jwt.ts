/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable eol-last */
/* eslint-disable rest-spread-spacing */
import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

export const signJWT = (payload: Record<string, any>, options?: jwt.SignOptions) => {
    try {
        return jwt.sign(payload, CONFIG.jwt_private, {
            ...(options || {}),
            algorithm: 'RS256',
        });
    } catch (error) {
        throw new Error('Failed to sign JWT');
    }
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, CONFIG.jwt_public);
        return {
            value: true,
            expored: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt is expired or not eligible to use',
            decoded: null
        }
    }
}