const express = require('express')

const app = express()

app.use(express.json())

app.get('/user', (req, res) => {
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
  const username = req.headers.username
  const password = req.headers.password

  if (username === 'heeler' && password === 'shakil') {
    res.status(200).send('Welcome Heeler')
    return
  }

  res.status(401).send('Invalid username or password')

  // res.send(`Hey ${username}, I know ur Password, its ${password}`)

  // body chipake data bhejta h while headers in well defined hidden data sent to server
})

app.delete('/', (req, res) => {
  res.send('Hello Delete')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
