/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable eol-last */
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    product_name: {
      type: String
    },
    price: {
      type: Number
    },
    size: {
      type: Number
    },
    description: {
      type: String
    },
    status: {
      type: String
    }
  },
  { timestamps: true }
)

const productModel = mongoose.model('product', productSchema)

export default productModel