/* eslint-disable eol-last */
import { Router } from 'express'
import { getCryptoCategories, getCryptoCategory, getLatestCryptoListings } from './controller/cmcController'

export const CmcRouter: Router = Router()

CmcRouter.get('/listings/latest', getLatestCryptoListings)
CmcRouter.get('/categories', getCryptoCategories)
CmcRouter.get('/category', getCryptoCategory)