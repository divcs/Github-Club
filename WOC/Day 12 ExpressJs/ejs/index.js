const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
let port = 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello, world')
})

app.get('/home', (req, res) => {
  res.render('home.ejs')
})

app.get('/home/:id', (req, res) => {
  console.log(req.params.id)
  // let { id } = req.params
  // res.redirect('view.ejs', { id })
  res.redirect('view.ejs')
})

app.get('/view', (req, res) => {
  res.render('view.ejs')
})
