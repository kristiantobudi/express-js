import { Response, Request, NextFunction } from 'express'

export const setResponseObject = (req: Request, res: Response, next: NextFunction) => {
  (req as any).resposeObject = res
  next()
}
