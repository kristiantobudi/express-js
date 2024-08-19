/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable eol-last */
import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    tracking_id: {
      type: String,
    },
    stock_name: {
      type: String
    },
    currency: {
      type: String
    },
    currency_code: {
      type: String
    },
    retail: {
      type: String
    },
    stock_market_cap: {
      type: String
    },
    money: {
      type: String
    }
  },
  { timestamps: true }
)

const transactionModel = mongoose.model('product', transactionSchema)

export default transactionModel