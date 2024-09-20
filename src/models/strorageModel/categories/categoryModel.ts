import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      unique: true
    },
    category_name: {
      type: String,
      default: ''
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
