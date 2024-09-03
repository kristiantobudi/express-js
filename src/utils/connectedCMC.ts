/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/space-infix-ops */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable eol-last */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios'

const cmc_api_key = process.env.CMC_API_KEY
const url_api = process.env.CMC_URL

export const getListingsLatest = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url_api}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': cmc_api_key
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching CoinMarketCap data:', error)
    return Promise.reject(error)
  }
}

export const getCategories = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url_api}/v1/cryptocurrency/categories`, {
      headers: {
        'Accept': 'application/json',
        'X-CMC_PRO_API_KEY': cmc_api_key,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching CoinMarketCap data:', error)
    return Promise.reject(error)
  }
}

export const getCategory = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${url_api}/v1/cryptocurrency/category`, {
      headers: {
        'Accept': 'application/json',
        'X-CMC_PRO_API_KEY': cmc_api_key,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching CoinMarketCap data:', error)
    return Promise.reject(error)
  }
}