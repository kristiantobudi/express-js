/* eslint-disable eol-last */
import { Request, Response } from 'express'
import { getCategories, getCategory, getListingsLatest, getMap } from '../../../utils/connectedCMC'

export const getLatestCryptoListings = async (req: Request, res: Response) => {
  try {
    const data = await getListingsLatest()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}

export const getCryptoCategories = async (req: Request, res: Response) => {
  try {
    const data = await getCategories()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}

export const getCrptoCategory = async (req: Request, res: Response) => {
  try {
    const data = await getCategory()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}

export const getCryptoMap = async (req: Request, res: Response) => {
  try {
    const data = await getMap()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}