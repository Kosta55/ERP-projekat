import mongoose from 'mongoose'


const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB