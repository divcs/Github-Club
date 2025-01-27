const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true,
  },
})

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    age: Joi.number().min(18).max(100).required(),
  })

  const { error } = schema.validate(data)
  return error ? error.details : null
}

const userModel = mongoose.model('User', userSchema)

module.exports = { userModel, validateUser }
