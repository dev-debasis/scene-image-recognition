import os
import easyocr
import cv2
import sys
import json
import traceback
from datetime import datetime

# Setup logging to a file for more detailed debugging
def setup_logging():
    log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs")
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, "debug_log.txt")
    return open(log_path, 'a')

log_file = setup_logging()

def log_message(message):
    print(message, file=log_file)
    log_file.flush()
    print(message, file=sys.stderr)

def recognize_text_from_image(image_path):
    try:
        # Verbose logging
        log_message(f"Starting text recognition process")
        log_message(f"Current working directory: {os.getcwd()}")
        log_message(f"Image path received: {image_path}")

        # Validate image path
        if not os.path.exists(image_path):
            log_message(f"Error: Image {image_path} not found!")
            raise FileNotFoundError(f"Image {image_path} not found!")

        # Initialize EasyOCR reader
        log_message("Initializing EasyOCR reader")
        reader = easyocr.Reader(['en'], gpu=False)
        log_message("EasyOCR reader initialized")

        # Perform text recognition
        log_message("Performing text recognition")
        result = reader.readtext(image_path)
        log_message(f"Text recognition completed. Results: {result}")

        if not result:
            log_message("No text detected in the image")
            return {
                "detected_text": "",
                "annotated_image_path": "",
                "error": "No text detected in the image"
            }

        # Extract detected text
        detected_text = "\n".join([res[1] for res in result])
        log_message(f"Extracted text: {detected_text}")

        # Read and annotate image
        log_message("Reading image for annotation")
        img = cv2.imread(image_path)
        if img is None:
            log_message("Failed to load the image")
            raise ValueError("Failed to load the image. Ensure the file is valid.")

        # Annotate image with bounding boxes
        log_message("Annotating image with bounding boxes")
        for (bbox, text, prob) in result:
            (top_left, top_right, bottom_right, bottom_left) = bbox
            top_left = tuple(map(int, top_left))
            bottom_right = tuple(map(int, bottom_right))
            cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
            cv2.putText(
                img, text,
                (top_left[0], top_left[1] - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2, cv2.LINE_AA
            )

        # Create output directory
        log_message("Creating output directory")
        output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
        os.makedirs(output_dir, exist_ok=True)

        # Generate unique output filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_image_path = os.path.join(output_dir, f"output_annotated_image_{timestamp}.jpg")

        # Save annotated image
        log_message(f"Saving annotated image to {output_image_path}")
        cv2.imwrite(output_image_path, img)

        # Prepare result
        result_json = {
            "detected_text": detected_text,
            "annotated_image_path": os.path.abspath(output_image_path),
            "error": None
        }
        log_message("Result prepared successfully")
        
        return result_json

    except Exception as e:
        log_message(f"Detailed error: {traceback.format_exc()}")
        return {
            "detected_text": "",
            "annotated_image_path": "",
            "error": str(e)
        }
    finally:
        log_file.close()

if __name__ == "__main__":
    try:
        # Ensure the image path is provided
        if len(sys.argv) < 2:
            raise ValueError("No image path provided. Usage: python main.py <image_path>")

        # Get the image path from command-line arguments
        image_path = sys.argv[1]

        # Call the function and print the result as JSON
        result = recognize_text_from_image(image_path)
        print(json.dumps(result), flush=True)  # Flush to ensure output is immediately sent

    except Exception as e:
        log_message(f"Execution error: {traceback.format_exc()}")
        print(json.dumps({
            "detected_text": "",
            "annotated_image_path": "",
            "error": str(e)
        }), flush=True)