const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const { connectDB } = require('./database') // Your Mongoose connection function
const router = require('./routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

require('dotenv').config()

// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json())

// API routes
app.use('/api', router) //global middleware

// Function to connect to the database and start the server
async function startServer() {
  try {
    // Connect to the MongoDB database
    await connectDB()

    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Error starting the server:', error)
  }
}

startServer()
