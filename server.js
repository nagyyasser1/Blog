const express = require('express')
const path = require('path')
// const fileupload = require('express-fileupload')
const multer = require('multer')

const app = express()

let initial_path = path.join(__dirname, 'public')
app.use(express.static(initial_path))
// app.use(fileupload())

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, 'home.html'))
})

app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, 'editor.html'))
})

// --------image store configration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, initial_path)
  },
  filename: function (req, file, cb) {
    imagename = Date.now() + '-' + Math.round(Math.random() * 1e9)
    file_path =
      'uploads/' + file.fieldname + '-' + imagename + file.originalname
    cb(null, file_path)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})
// upload link
app.post('/upload', upload.single('image'), (req, res) => {
  res.json(`${file_path}`)
})

app.get('/:blog', (req, res) => {
  res.sendFile(path.join(initial_path, 'blog.html'))
})

app.use((req, res) => {
  res.json('404')
})

app.listen('3000', () => {
  console.log('listening......')
})
