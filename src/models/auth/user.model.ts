/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable eol-last */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: ''
        },
        first_name: {
            type: String,
            default: ''
        },
        last_name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            unique: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model('user', userSchema)

export default userModel