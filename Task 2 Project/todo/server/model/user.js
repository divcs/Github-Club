const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the User schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensure email is unique in the collection
      lowercase: true, // Normalize to lowercase
      match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
  },
  { timestamps: true }
) // Automatically adds createdAt and updatedAt fields

// Create the User model based on the schema
const User = mongoose.model('User', userSchema)

module.exports = User
