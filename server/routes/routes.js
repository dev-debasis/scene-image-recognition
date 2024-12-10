const express = require('express');
const multer = require('multer');
const path = require('path');
const aiModel = require('../model_integration/aiModel');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route to upload image and process it through AI model
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
