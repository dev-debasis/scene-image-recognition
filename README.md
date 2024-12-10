# Scene Image Text Recognition

This project is a Python-based text recognition system that detects and extracts text from scene images. The system processes images, displays the detected text with bounding boxes, and saves annotated images to a separate output folder.

---

## Features
- **Text Detection and Recognition**: Uses EasyOCR for accurate text recognition from images.
- **Bounding Box Visualization**: Displays the detected text with bounding boxes on the images.
- **Image Annotation Storage**: Saves annotated images in an output folder for later reference.

---

## Prerequisites

Before running the project, ensure you have the following installed:
- Python 3.8 or later
- Required Python libraries (install via `requirements.txt` or manually):
  - `easyocr`
  - `opencv-python`
  - `matplotlib`
  - `numpy`

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dev-debasis/scene-image-recognition.git
   cd scene-image-recognition
   
2. **Install Dependencies**:
   ```bash
   pip install easyocr opencv-python matplotlib numpy

  3. **Project Structure**
   ```bash
  scene-image-recognition/
├── main.py           # Python script for text recognition
├── word_dataset/     # Folder containing input images/datasets
│   ├── 1.png         # Example input image
│   ├── 2.jpg         # Example input image
│   └── ...
├── output/           # Folder to save annotated images
├── requirements.txt  # Required libraries
├── .gitignore
├── LICENSE
└── README.md         # Project documentation
```
- `word_dataset/`: Contains input images for text recognition.
- `output/`: Stores annotated images generated by the script.

---

## Usage

1. Run the `main.py` script:

```bash
python main.py
```

2. Follow the prompts:

- Enter the image number from the `word_dataset/` folder (e.g., `1`).
- View the detected text in the console.
- The annotated image will be displayed and saved in the `output/` folder.
- Type `exit` to quit the program.

---

## Example

### Input Image
- File: `word_dataset/1.png`

### Output
- Detected Text: `TITAN`
- Annotated Image: Saved as `output/output_1.jpg`

---

## Future Enhancements
- Add support for recognizing multiple languages.
- Enable GPU acceleration for faster recognition.
- Extend functionality to process bulk images in a batch.

---
## License
- This project is licensed under the MIT License. See the `LICENSE` file for details.
  
---
## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.