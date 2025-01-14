const express = require('express')

const app = express()

app.get('/user', (req, res) => {
  const name = req.query.name
  //http://localhost:3000/user?name=divya gives hello divya
  res.send('Hello ' + name)
})

app.get('/heelo', (req, res) => {
  res.send('Hello heelo')
})

app.get('/', (req, res) => {
  res.send('Hello GET')
})

app.post('/data', (req, res) => {
  const username = req.headers.username
  const password = req.headers.password
  // res.json({ username, password })

  res.send(`Hello ${username} your password is ${password}`)
})

app.post('/', (req, res) => {
  res.send('Hello POST')
})

app.put('/', (req, res) => {
  res.send('Hello PUT')
})

app.delete('/', (req, res) => {
  res.send('Hello Delete')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
