const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const timeCapsuleRoutes = require('./routes/timeCapsule') // Renamed for clarity
const connectDB = require('./config/db')
dotenv.config()

const app = express()
app.use(cors())

// Middleware to parse JSON data and form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', authRoutes) // Auth routes
app.use('/api', timeCapsuleRoutes) // Time capsule routes

// Connect to DB and start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, async () => {
  await connectDB() // Ensure DB is connected before starting the server
  console.log(`Server is listening on port ${PORT}`)
})
