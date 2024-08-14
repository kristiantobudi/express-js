/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-useless-return */
import CONFIG from "../config/environment"
import { Request, Response } from "express"
import jsonwebtoken from 'jsonwebtoken'

interface CustomRequest extends Request {
    user?: string | object | undefined;
}

export const auth = (req: CustomRequest, res: Response) => {
    try {
        const accessToken = req.headers?.authorization?.replace("Bearer ", "")
        
        if(!accessToken) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: "Unauthorized"
            });
        }

        const jwt_payload = jsonwebtoken.verify(accessToken, CONFIG.jwt_private);
        req.user = jwt_payload;

    } catch (error) {
        return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized"
        })
    }
}