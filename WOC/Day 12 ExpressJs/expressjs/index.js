const express = require('express')
const app = express()

let port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// app.use((req, res, next) => {
//   console.log('Use')
//
// })
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Route to handle dynamic username
app.get('/:username', (req, res) => {
  console.log(req.params.username) // Corrected 'request' to 'req'
  res.send(`User page for ${req.params.username}`)
})

// Route to handle username and id
app.get('/:username/:id', (req, res) => {
  let { username, id } = req.params // Corrected 'request' to 'req'
  console.log(`Username: ${username}, ID: ${id}`)
  res.send(`User ID page. Your ID is ${id}`)
})

app.get('/search', (req, res) => {
  console.log(req.query)
  res.send('Search page')
})
