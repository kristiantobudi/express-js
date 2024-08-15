/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/indent */
import { NextFunction, Request, Response } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user) {
        return res.sendStatus(403)
    }
    return next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (!user || user._doc.role !== 'admin'){
        return res.sendStatus(403)
    }
}