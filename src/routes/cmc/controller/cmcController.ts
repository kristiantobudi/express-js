import { Request, Response } from 'express'
import { getCategories, getListingsLatest, getCategory } from '../../../utils/connectedCMC'

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

export const getCryptoCategory = async (req: Request, res: Response) => {
  try {
    const data = await getCategory()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}
