const mongoose = require('mongoose')

const timeCapsuleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    coverPhoto: { type: String, required: true },
    title: { type: String, required: true },
    dateTime: { type: Date, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TimeCapsule', timeCapsuleSchema)
