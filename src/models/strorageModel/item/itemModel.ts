import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      default: '',
      required: true
    },
    sku: {
      type: String,
      default: '',
      unique: true
    },
    quantity: {
      type: Number,
      default: 0,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, reff: 'category', required: true
    },
    storage_location: {
      type: mongoose.Schema.Types.ObjectId, reff: 'location', required: true
    }
  }, {
    timestamps: true
  }
)

const itemModel = mongoose.model('item', itemSchema)

export default itemModel
