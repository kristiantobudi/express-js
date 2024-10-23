import multer from 'multer'

const storage = multer.memoryStorage() // Store the file in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(file.originalname.toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb(new Error('Only images are allowed!'))
    }
  }
})

export default upload
