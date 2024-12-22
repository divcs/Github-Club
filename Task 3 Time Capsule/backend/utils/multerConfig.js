const multer = require('multer')
const path = require('path')

// Define storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedFileTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedFileTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

const upload = multer({
  storage: storage,
  // limits: { fileSize: 5 * 1024 * 1024 },
  // fileFilter: fileFilter,
})

module.exports = upload
