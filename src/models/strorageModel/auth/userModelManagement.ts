import mongoose from 'mongoose'

const userModelSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    }
  }
  , { timestamps: true }
)

const userModelManagement = mongoose.model('user', userModelSchema)

export default userModelManagement
