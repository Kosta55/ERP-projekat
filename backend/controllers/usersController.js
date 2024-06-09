import User from '../models/User.js'

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ isAdmin: 'desc' }).select('-password')

  // If no users
  if (!users?.length) {
    return res.status(404).json({ message: 'No users' })
  }

  res.status(200).json(users)
}


// @desc   Get single user
// @route  GET /users/:id
// @access  Private/Admin
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

// @desc   Update user
// @route  PUT /users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const { name, email, isAdmin } = req.body

  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name = name || user.name
  user.email = email || user.email
  user.isAdmin = isAdmin

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const { name, password } = req.body

  const user = await User.findById(req.user._id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name = name || user.name
  //user.email = email || user.email

  if (password) {
    user.password = password
  }

  await user.save()

  const token = user.createJWT()

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  })
}

// @desc   Delete user
// @route  DELETE /users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  await user.remove()

  return res.status(200).json(user)
}

export {
  getUsers,
  getUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  deleteUser,
}
