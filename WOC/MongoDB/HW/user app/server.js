const express = require('express')
const mongoose = require('mongoose')
const { userModel, validateUser } = require('./models/user')

const app = express()
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/userManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const validation = validateUser(req.body)
    if (validation) {
      return res.status(400).json({ errors: validation })
    }

    const user = await userModel.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Read users
app.get('/api/users', async (req, res) => {
  try {
    const users = await userModel.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const validation = validateUser(req.body)
    if (validation) {
      return res.status(400).json({ errors: validation })
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
