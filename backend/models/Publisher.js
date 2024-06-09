import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Publisher', publisherSchema)