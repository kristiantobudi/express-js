import { NextFunction, Router, Request, Response } from 'express'

export const ProductRouter: Router = Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: [
      {
        id: 1,
        name: 'Samsung Galaxy S22',
        price: 10000000
      },
      {
        id: 2,
        name: 'Samsung Galaxy S22',
        price: 10000000
      }
    ]
  })
})
