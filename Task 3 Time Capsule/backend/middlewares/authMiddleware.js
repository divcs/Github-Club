const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.authorization?.split(' ')[1]
  // console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    req.user = decoded //userid in decoded
    // console.log(req.user?.id)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware
