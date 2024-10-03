import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    sequence_value: {
      type: Number,
      required: true
    },
    category_id: {
      type: String,
      required: true,
      unique: true
    },
    category_name: {
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

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel
