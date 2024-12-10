// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { exec } = require('child_process'); // Import exec for running Python scripts
// const cors = require('cors');
// const app = express();

// // Enable CORS
// app.use(cors());

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads'); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   }
// });

// const upload = multer({ storage: storage });

// // API endpoint to upload image
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     console.error('No file uploaded');
//     return res.status(400).send('No file uploaded');
//   }

//   console.log('File uploaded:', req.file);

//   // Construct image path for model
//   const imagePath = path.join(__dirname, 'uploads', req.file.filename);

//   // Run Python script with the image path
//   exec(`python ${path.join(__dirname, 'model', 'main.py')} ${imagePath}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing Python script: ${error}`);
//       return res.status(500).json({ message: 'Error processing image' });
//     }
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return res.status(500).json({ message: 'Error processing image' });
//     }

//     // Parse the result from Python script
//     const result = JSON.parse(stdout); // Assuming your Python script prints a JSON object

//     // Respond with the detected text and annotated image path
//     res.json(result);
//   });
// });

// // Server setup
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// API endpoint to upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).send('No file uploaded');
  }

  console.log('File uploaded:', req.file);

  // Construct the absolute path for the Python script
  const pythonScriptPath = path.join(__dirname, '..', 'model', 'main.py'); // Adjusted path to main.py
  const imagePath = path.join(__dirname, 'uploads', req.file.filename); // Path to uploaded image

  // Execute the Python script with the image path as argument
  exec(`python "${pythonScriptPath}" "${imagePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ message: 'Error processing image' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error processing image' });
    }

    try {
      // Assuming the Python script returns a JSON object with the result
      const result = JSON.parse(stdout);  // Ensure the Python script returns a valid JSON object
      res.json(result);  // Send the result back to the client
    } catch (parseError) {
      console.error(`Error parsing Python response: ${parseError}`);
      res.status(500).json({ message: 'Error parsing result' });
    }
  });
});

// Server setup
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
