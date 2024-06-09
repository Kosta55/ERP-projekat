import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authenticate = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization || req.headers.Authorization
  
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please login'})
    }
  
    try {
      // Get token from header
      token = authHeader.split(' ')[1]
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password')
  
      if (!req.user) {
        return res.status(401).json({ message: 'Not Authorized'})
      }
  
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Not Authorized, token failed'})
    }
  }

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(403).json({ message: 'Not Authorized as an Admin'})
  }
}

export { authenticate, admin }