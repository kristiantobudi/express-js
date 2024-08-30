export default interface CMCType {
  id: any // Unique identifier
  name: string
  slug: string
  cmc_rank: number
  num_market_pairs: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  infinite_supply: boolean
  last_updated: string
  date_added: string // Date-time format
  tags: string[]
  platform: object | null
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      last_updated: string // Date-time format
    }
  }
}
