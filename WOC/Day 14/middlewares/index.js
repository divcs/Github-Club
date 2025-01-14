const express = require('express')
const app = express()

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
app.use(logger)
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/user', auth, (req, res) => {
  res.send('User Page')
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}
function auth(req, res, next) {
  if (req.query.admin === 'true') {
    //when http://localhost:3000/user?admin=true this is true then only //User page is shown
    next()
    // if next is used then it will go to next middleware and also run the code below after it executes the next middleware, but in return it will return from that code and not run the code below
  } else {
    res.send('No auth')
  }
}
