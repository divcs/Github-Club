const express = require('express')
const zod = require('zod')

const app = express()
app.use(express.json())

const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: 'Make your password 8 char long' })
    .max(14),
})

function login(req, res, next) {
  const validation = loginSchema.safeParse(req.body)
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors })
    return
  }

  const { username, password } = req.body
  if (username === 'divya@gmail.com' && password === 'password123') {
    next()
    return
  }
  res.status(401).send('Invalid Username or Password')
}

const registerSchema = zod.object({
  name: zod.string().min(1),
  age: zod.number().min(1).max(99),
  phone: zod.string(),
  email: zod.string().email(),
  video: zod.string().url(),
})

function register(req, res, next) {
  const validation = registerSchema.safeParse(req.body)
  if (!validation.success) {
    res.status(400).json({ error: validation.error.errors })
    return
  }
  next()
}

app.post('/login', login, (req, res) => {
  const { username } = req.body
  res.status(200).json({ message: `Welcome ${username}` })
})

app.post('/register', register, (req, res) => {
  const { name, age, phone, email, video } = req.body
  res.status(201).json({
    message: 'Registration successful',
    data: { name, age, phone, email, video },
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
