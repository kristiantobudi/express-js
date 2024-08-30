import { Request, Response } from 'express'
import { getListingsLatest } from '../../../utils/connectedCMC'

export const getLatestCryptoListings = async (req: Request, res: Response) => {
  try {
    const data = await getListingsLatest()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest listings from CoinMarketCap' })
  }
}
