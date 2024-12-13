const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  aiModel.processImage(imagePath, (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Error processing image' });
    }
    res.status(200).send({ result: result });
  });
});

module.exports = router;
