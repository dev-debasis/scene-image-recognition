const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors');
const fs = require('fs');

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

// Logging function
function logToFile(message) {
  const logDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
  }
  const logPath = path.join(logDir, 'server_debug.log');
  fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`);
}

// API endpoint to upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      logToFile('No file uploaded');
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    logToFile(`File uploaded: ${JSON.stringify(req.file)}`);
    console.log('File uploaded:', req.file);

    // Construct the absolute paths
    const pythonScriptPath = path.join(__dirname, 'model', 'main.py');
    const imagePath = path.join(__dirname, req.file.path);

    logToFile(`Python Script Path: ${pythonScriptPath}`);
    logToFile(`Image Path: ${imagePath}`);

    // Use spawn instead of exec for better handling of large outputs
    const pythonProcess = spawn('python', [pythonScriptPath, imagePath]);

    let output = '';
    let errorOutput = '';

    // Capture standard output
    pythonProcess.stdout.on('data', (data) => {
      const dataStr = data.toString();
      output += dataStr;
      logToFile(`Python STDOUT: ${dataStr}`);
      console.log('Python stdout:', dataStr);
    });

    // Capture error output
    pythonProcess.stderr.on('data', (data) => {
      const dataStr = data.toString();
      errorOutput += dataStr;
      logToFile(`Python STDERR: ${dataStr}`);
      console.error('Python stderr:', dataStr);
    });

    // Handle process close
    pythonProcess.on('close', (code) => {
      logToFile(`Python process exited with code ${code}`);
      console.log('Python process exited with code', code);

      // Log full error output for debugging
      if (errorOutput) {
        logToFile(`Full error output: ${errorOutput}`);
        console.error('Full error output:', errorOutput);
      }

      if (code !== 0) {
        return res.status(500).json({
          message: 'Error processing image',
          error: errorOutput
        });
      }

      try {
        const result = JSON.parse(output);
        logToFile(`Parsed result: ${JSON.stringify(result)}`);
        res.json(result);
      } catch (parseError) {
        logToFile(`Parse error: ${parseError}`);
        console.error('Error parsing Python output:', parseError);
        res.status(500).json({
          message: 'Error parsing result',
          error: parseError.toString(),
          rawOutput: output
        });
      }
    });
  } catch (error) {
    logToFile(`Unexpected error: ${error}`);
    console.error('Unexpected error:', error);
    res.status(500).json({
      message: 'Unexpected server error',
      error: error.toString()
    });
  }
});

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});