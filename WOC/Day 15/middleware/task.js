const express = require('express')
const zod = require('zod')

const app = express()
app.use(express.json())

function shakilCheck(req, res, next) {
  const username = req.query.name
  if (username == 'shakil') {
    next()
    return
  }
  res.status(401).send('U are not authorized')
}

const loginSchema = zod.object({
  username: zod.string(),
  password: zod.string().min(6).max(20),
  age: zod.string().url(),
})

function login(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  const age = req.body.age
  const validation = loginSchema.safeParse(req.body)
  // const validation1 = loginSchema.Parse(req.body);
  console.log(validation)
  if (!validation.success) {
    res.status(400).json({ error: validation.error })
    return
  }
  if (username == 'Heeler' && password == 'shakil') {
    next()
    return
  }
  res.status(401).send('Invalid Username or Password')
}

// app.use(shakilCheck);
// app.use(express.static('public'))

app.get('/get', (req, res) => {
  res.send('Hello GET')
})

app.post('/body', login, (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const age = req.body.age
  res.status(200).json({ username, password, age })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
