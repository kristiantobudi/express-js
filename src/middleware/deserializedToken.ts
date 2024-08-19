/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt/jwt";

export const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");
    if (!accessToken) {
        return next();
    }

    const token: any = verifyJWT(accessToken)
    if (token.decoded) {
        res.locals.user = token.decoded
        return next()
    }

    if (token.expired) {
        return next()
    }

    return next()
}