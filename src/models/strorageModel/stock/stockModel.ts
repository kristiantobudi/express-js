import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.String, ref: 'items', required: true
    },
    action: {
      type: String,
      enum: ['stock_in', 'stock_out', 'adjustment'],
      required: true
    },
    quantity_change: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

const stockModel = mongoose.model('stock', stockSchema) || mongoose.models.stock

export default stockModel
