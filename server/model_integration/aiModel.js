const { spawn } = require('child_process');

// Function to interact with the AI model (Python script)
function processImage(imagePath, callback) {
  const pythonProcess = spawn('python', ['./model/recognize_text.py', imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    callback(null, data.toString());
  });

  pythonProcess.stderr.on('data', (error) => {
    callback(error, null);
  });
}

module.exports = { processImage };
