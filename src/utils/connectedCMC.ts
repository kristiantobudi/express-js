/* eslint-disable eol-last */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import axios from 'axios'

const cmc_api_key = process.env.CMC_API_KEY
const url_api = process.env.CMC_URL

export const getListingsLatest = async () => {
  try {
    const response = await axios.get(`${url_api}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': cmc_api_key
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching CoinMarketCap data:', error)
    throw error
  }
}