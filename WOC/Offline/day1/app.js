const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const multer = require('multer')

// Set up multer storage to save files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a folder with your name in the uploads folder
    const userFolder = path.join(__dirname, 'uploads', 'YourName')
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true }) // Create folder if it doesn't exist
    }
    cb(null, userFolder) // Set the destination folder
  },
  filename: (req, file, cb) => {
    // Use original file name
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

// Create the server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname

  // Handle GET request to '/search' route
  if (req.method === 'GET' && pathName === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
  } else if (req.method === 'GET' && pathName === '/search') {
    console.log(parsedUrl.query) // Log the query parameters
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Search page')
  }

  // Handle POST request for file upload to '/upload' route
  else if (req.method === 'POST' && pathName === '/upload') {
    // Use multer to handle the file upload
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Error uploading file: ' + err.message)
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(`File uploaded successfully: ${req.file.originalname}`)
      }
    })
  } else {
    // Handle 404 - route not found
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
})

// Define the port
const PORT = 3000

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`)
})
