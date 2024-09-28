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
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  }
  , { timestamps: true }
)

const userModelManagement = mongoose.model('user', userModelSchema)

export default userModelManagement
