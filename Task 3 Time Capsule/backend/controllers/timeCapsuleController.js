const { default: mongoose } = require('mongoose')
const TimeCapsule = require('../models/timeCapsuleModel')

const createTimeCapsule = async (req, res) => {
  try {
    const { title, dateTime, description, content } = req.body

    // Validate that all required fields are present
    if (!title || !dateTime || !description || !content) {
      return res.status(400).json({
        error:
          'All fields are required: userId, title, dateTime, description, content',
      })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Cover photo is required' })
    }

    const coverPhoto = req.file ? req.file.path : ''
    const userId = req?.user?.id
    console.log(userId)

    const newTimeCapsule = new TimeCapsule({
      userId,
      coverPhoto,
      title,
      dateTime,
      description,
      content,
    })

    await newTimeCapsule.save()

    res.status(201).json({
      status: true,
      message: 'Time Capsule created successfully!',
      data: newTimeCapsule,
    })
  } catch (error) {
    console.error('Error creating time capsule:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
}

const getAllTimeCapsules = async (req, res) => {
  try {
    const userId = req.user.id // Get the authenticated user's ID

    // Find all time capsules belonging to the authenticated user
    const timeCapsules = await TimeCapsule.find({ userId })

    if (!timeCapsules.length) {
      return res
        .status(404)
        .json({ message: 'No time capsules found for this user' })
    }

    res.status(200).json({
      status: true,
      message: 'Time Capsules fetched successfully',
      data: timeCapsules,
    })
  } catch (error) {
    console.error('Error fetching time capsules:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
}

const getIndividualTimeCapsule = async (req, res) => {
  try {
    const { id } = req.body
    console.log(id)
    // First get the time capsule
    const timeCapsule = await TimeCapsule.findById(id)

    if (!timeCapsule) {
      return res.status(404).json({
        status: false,
        message: 'Time capsule not found',
      })
    }

    if (new Date(timeCapsule.dateTime) > new Date()) {
      return res.status(403).json({
        status: false,
        message: 'Time capsule cannot be accessed yet',
      })
    }

    res.status(200).json({
      status: true,
      message: 'Time Capsule fetched successfully',
      data: timeCapsule,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: false,
      error: 'An unexpected error occurred',
    })
  }
}

const deleteTimeCapsule = async (req, res) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ error: 'Time capsule ID is required' })
    }

    // Find and delete the time capsule
    const deletedTimeCapsule = await TimeCapsule.findByIdAndDelete(id)

    if (!deletedTimeCapsule) {
      return res.status(404).json({
        status: false,
        message: 'Time capsule not found. Deletion unsuccessful.',
      })
    }

    res.status(200).json({
      status: true,
      message: 'Time capsule deleted successfully',
      data: deletedTimeCapsule,
    })
  } catch (error) {
    console.error('Error deleting time capsule:', error)
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
}

module.exports = {
  createTimeCapsule,
  getAllTimeCapsules,
  getIndividualTimeCapsule,
  deleteTimeCapsule,
}
