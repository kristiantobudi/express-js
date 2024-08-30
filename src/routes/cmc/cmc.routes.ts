import { Router } from 'express'
import { getLatestCryptoListings } from './controller/cmcController'

export const CmcRouter: Router = Router()

CmcRouter.get('/listings/latest', getLatestCryptoListings)
