const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(403).json({ message: 'No token provided, access denied' })
  }

  try {
    const decoded = jwt.verify(token, '21dec2023')
    console.log(decoded)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authenticateToken
