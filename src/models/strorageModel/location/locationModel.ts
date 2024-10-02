import mongoose from 'mongoose'

const storageSchema = new mongoose.Schema(
  {
    storage_name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }, {
    timestamps: true
  }
)

const storageLocationModel = mongoose.model('location_storage', storageSchema) || mongoose.models.location_storage

export default storageLocationModel
