const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id
    next()
  } catch (error) {
    console.error('Token verification failed:', error.message)
    console.error('JWT_SECRET available:', !!process.env.JWT_SECRET)
    res.status(401).json({ message: 'Token failed', error: error.message })
  }
}

module.exports = protect