import mongoose from 'mongoose'

const userModelSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true
    },
    name: {
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
    },
    last_login_attempt: {
      type: String,
      default: ''
    },
    failed_login_count: {
      type: Number,
      default: 0
    }
  }
  , { timestamps: true }
)

const userModelManagement = mongoose.model('user', userModelSchema)

export default userModelManagement
