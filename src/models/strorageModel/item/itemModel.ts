import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    item_id: {
      type: String,
      unique: true
    },
    item_name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    sku: {
      type: String,
      default: ''
    },
    quantity: {
      type: Number,
      default: 0
    },
    category_id: {
      type: String,
      default: ''
    }
  }, {
    timestamps: true
  }
)

const itemModel = mongoose.model('item', itemSchema)

export default itemModel
