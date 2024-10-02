import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    sequence_value: {
      type: Number,
      required: true
    },
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
      type: String,
      ref: 'Category',
      required: true
    },
    storage_location: {
      type: String,
      ref: 'Location',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const itemModel = mongoose.model('item', itemSchema)

export default itemModel
