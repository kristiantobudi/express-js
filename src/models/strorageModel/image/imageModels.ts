import mongoose, { Model, Schema } from 'mongoose'

interface ImageProps extends Document {
  img: string
}

const imageSchema: Schema<ImageProps> = new Schema({
  img: {
    type: String,
    required: [true, 'Please upload an image']
  }
})

const Image: Model<ImageProps> = mongoose.model<ImageProps>('Image', imageSchema)

export default Image
