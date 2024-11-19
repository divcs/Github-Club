const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  status: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
