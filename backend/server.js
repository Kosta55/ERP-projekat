import app from './app.js'
import connectDB from './db/db.js'

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB()
    console.log(`Connected to MongoDB!`)
    console.log(process.env.NODE_ENV)
    app.listen(port, () => {
      console.log(`Server running on port: http://localhost:${port}`)
    })
  } catch (error) {
    console.log(`Connection to MongoDB failed. Error: ${error}`)
  }
}

start()
