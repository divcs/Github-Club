const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      data: [],
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //key here is userid so decoded gets userid as key
      expiresIn: '1h',
    })

    res.json({
      status: true,
      message: 'User Login Successfully',
      data: user,
      token: token, // Send token separately as a key
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { register, login }
