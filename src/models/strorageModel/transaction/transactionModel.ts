import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    action: {
      type: String,
      enum: ['check_in', 'check_out'],
      required: true
    },
    quantity: {
      type: Number,
      default: 0,
      required: true
    }
  }, {
    timestamps: true
  }
)

const transactionDataModel = mongoose.model('transaction', transactionSchema) || mongoose.models.transaction

export default transactionDataModel
