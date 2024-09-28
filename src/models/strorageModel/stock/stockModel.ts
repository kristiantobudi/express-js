import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    quantity_change: {
      type: Number,
      default: 0,
      required: true
    },
    reason: {
      type: String,
      enum: ['stock_in', 'stock_out', 'adjustment'],
      required: true
    }
  }, {
    timestamps: true
  }
)

const stockModel = mongoose.model('stock', stockSchema) || mongoose.models.stock

export default stockModel
