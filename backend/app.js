import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import publisherRoutes from './routes/publisherRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import { notFoundMiddleware, errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js'

const app = express()

app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next() 
  } else {
    express.json()(req, res, next)
  }
})

//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Ecommerce App' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/publishers', publisherRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/stripe', paymentRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app
