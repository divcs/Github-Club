const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB successfully 🙏')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // to stop the process of node
  }
}

module.exports = { connectDB }
