import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
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
