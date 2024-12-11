# Scene Image Text Recognition

This project is a web-based text recognition system that detects and extracts text from scene images. The system allows users to upload images through a client web app, which is connected to a server that integrates an AI model built using Python. The AI model also generates annotated images with bounding boxes around detected text.

---

## Features
- **Text Detection and Recognition**: Text Detection and Recognition from scene images.
- **Bounding Box Visualization**: Displays the detected text with bounding boxes on the images.
- **Image Upload**: Allows users to upload images via a web interface.
- **Backend Integration**: The backend handles image processing and AI model integration.
- **Annotated Image Generation**: Saves annotated images with text recognition and bounding boxes.

---

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js
- Python 3.8 or later
- Required Python libraries
  - `easyocr`
  - `opencv-python`
  - `flask`
  - `flask-cors`

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dev-debasis/scene-image-recognition.git
   cd scene-image-recognition
   ```

2. **Install Dependencies for Frontend**:
   In the `client/` directory, install the necessary frontend dependencies using:
   ```bash
   npm install
   ```

3. **Install Dependencies for Backend**:
   In the `server/` directory, install the required Python libraries using:
   ```bash
   npm install
   ```

---

## Project Structure

```bash
scene-image-recognition/
├── client/                  # Frontend (React app)
│   ├── public/              # Static files for frontend
│   └── src/                 # React components and code
├── server/                  # Backend (Node.js and Python integration)
│   ├── uploads/             # Folder for uploaded images
|   ├── controllers/         # Controllers/logics
|   ├── routes/              # routes/endpoints
│   ├── output/              # Folder to save annotated images
│   ├── server.js            # Main server file (Node.js/Express)     
│   └── requirements.txt     # Required Python libraries for backend
├── model/
|   ├── output/              # Folder for uploaded images
|   ├── word_dataset/        # datasets
|   ├── main.py              # main model file-entry point
│   └── mainModel.py         # individual main model
├── .gitignore
├── LICENSE                  
└── README.md                # Project documentation
```

---

## Usage

### 1. Run the Backend Server

In the `server/` directory, start the backend server:
```bash
npm start
```
This will start the backend server, which listens on `http://localhost:5000`.

### 2. Run the Frontend Application

In the `client/` directory, start the frontend React application:
```bash
npm start
```
This will start the frontend application, accessible at `http://localhost:3000`.

### 3. Upload Image and Get Detected Text

- Select an image to upload from the frontend.
- Click the "Upload and Detect Text" button.
- The backend will process the image using the AI model, and the frontend will display the detected text and the annotated image.

---

## Example

### Input Image
- File: `uploads/1.png`

### Output
- Detected Text: `TITAN`
- Annotated Image: Saved as `output/output_1.jpg`

---

## Future Enhancements
- Add support for recognizing multiple languages.
- Enable GPU acceleration for faster recognition.
- Extend functionality to process bulk images in a batch.
- Improve user interface for better interaction and feedback.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---