const express = require('express')
const {
  createTimeCapsule,
  getAllTimeCapsules,
  getIndividualTimeCapsule,
  deleteTimeCapsule,
} = require('../controllers/timeCapsuleController')
const upload = require('../utils/multerConfig')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.post(
  '/create-time-capsule',
  authMiddleware,
  upload.single('coverPhoto'),
  createTimeCapsule
)

router.get('/get-all-time-capsule', authMiddleware, getAllTimeCapsules)

router.get(
  '/get-individual-time-capsule',
  authMiddleware,
  getIndividualTimeCapsule
)

router.post('/delete-time-capsule', authMiddleware, deleteTimeCapsule)

module.exports = router
