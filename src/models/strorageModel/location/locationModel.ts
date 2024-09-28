import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema(
  {
    location_name: {
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

const storageLocationModel = mongoose.model('location_storage', locationSchema) || mongoose.models.location_storage

export default storageLocationModel
