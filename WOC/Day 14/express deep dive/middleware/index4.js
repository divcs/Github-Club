const express = require('express')

const app = express()
app.use(express.json())

function middleware(req, res, next) {
  const name = req.query.name
  if (name === 'shakil') {
    next()
  } else {
    res.status(401).send('Invalid User')
  }
}

app.use(middleware)

app.get('/learner', middleware, (req, res) => {
  const name = req.query.name
  res.send(`Hello ${name}`)
})

app.get('/', (req, res) => {
  res.send('Hello GET')
})

app.post('/data', (req, res) => {
  const username = req.headers.username
  const password = req.headers.password

  res.send(`Hey ${username}, I know ur Password, its ${password}`)
})

app.post('/body', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username == 'Heeler' && password == 'shakil') {
    res.status(200).send('Welcomback Heeler')
    return
  }
  res.status(401).send('Invalid Username or Password')
})

app.delete('/', (req, res) => {
  res.send('Hello Delete')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
