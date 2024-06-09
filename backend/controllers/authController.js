import User from '../models/User.js'
import createHttpError from 'http-errors'

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    throw createHttpError(400, 'Please include all fields')
  }

  
  // Find if user already exists
  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) {
    throw createHttpError(409, 'User already exists with this email')
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  const token = user.createJWT()

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    })
  } else {
    throw createHttpError(400, 'Invalid user data')
  }
}

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createHttpError(400, 'Email and password are required')
  }

  const user = await User.findOne({ email }).exec()

  if (!user) {
    throw createHttpError(401, 'Invalid credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw createHttpError(400, 'Incorrect password')
  }

  const token = user.createJWT()

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  })
}

export { register, login }
