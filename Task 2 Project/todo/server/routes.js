const express = require('express')
const router = express.Router()
const Todo = require('./model/todo') // Import the Todo model
const bcrypt = require('bcrypt')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const authenticateToken = require('./middleware/authenticateToken')

// GET /todos
router.get('/todos', authenticateToken, async (req, res) => {
  try {
    // Fetch todos for the authenticated user
    const todos = await Todo.find({ user: req.user.userId }) // Filter todos by user's ID

    if (!todos.length) {
      return res.status(404).json({ msg: 'No todos found for this user.' })
    }

    res.status(200).json(todos)
  } catch (error) {
    console.error('Error retrieving todos:', error)
    res.status(500).json({ message: 'Error retrieving todos', error })
  }
})

// POST /todos
router.post('/todos', authenticateToken, async (req, res) => {
  try {
    const { todo } = req.body

    // Validate the 'todo' field
    if (!todo || todo.trim().length < 4) {
      return res
        .status(400)
        .json({ msg: 'Todo must be at least 4 characters long.' })
    }

    // Ensure the user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ msg: 'Unauthorized: No user found.' })
    }

    // Create the new todo and associate it with the user
    const newTodo = new Todo({
      todo,
      status: false,
      user: req.user.userId, // Attach the authenticated user's ID
    })

    await newTodo.save()

    res.status(201).json({ msg: 'Todo created successfully', todo: newTodo })
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ msg: 'Error creating todo', error })
  }
})

// DELETE /todos/:id
router.delete('/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const deletedTodo = await Todo.findByIdAndDelete(id)

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(deletedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error })
  }
})

// PUT /todos/:id
router.post('/todos/done/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (typeof status !== 'boolean') {
      return res.status(400).json({ msg: 'invalid status' })
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { status: !status },
      { new: true } // Return the updated document
    )

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error })
  }
})

router.post('/todos/update/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { todo } = req.body
    if (!todo || todo.trim() === '') {
      return res.status(400).json({ msg: 'Invalid todo content' })
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    )
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error })
  }
})

// POST /users/register - Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  // Validate input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Name, email, and password are required' })
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10) // 10 is the salt rounds

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    // Save the user to the database
    await newUser.save()

    // Send the token and user data in the response
    res.status(201).json({
      message: 'User registered successfully',

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email })

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password)

    // If password doesn't match, return error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate a JWT token with user info (user ID and email)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      '21dec2023',
      { expiresIn: '1h' }
    )

    // Send the token back in the response
    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
