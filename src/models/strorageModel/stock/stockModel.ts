import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  item: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  history: [{
    action: { type: String, enum: ['stock_in', 'stock_out', 'adjustment'], required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true })

const StockModel = mongoose.model('stock', stockSchema) || mongoose.models.stock

export default StockModel
