import os
import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np

# Initialize the EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

while True:
    # Prompt for the image number
    i = input("Enter the image number (or type 'exit' to quit): ")
    
    if i.lower() == 'exit':
        print("Exiting the program...")
        break

    try:
        # Construct the image path
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the script's directory
        IMAGE_PATH = os.path.join(BASE_DIR, "word_dataset", f"{i}.png")
        
        # Check if PNG exists; if not, try JPG
        if not os.path.exists(IMAGE_PATH):
            IMAGE_PATH = os.path.join(BASE_DIR, "word_dataset", f"{i}.jpg")
            if not os.path.exists(IMAGE_PATH):
                raise FileNotFoundError(f"Image {i}.png or {i}.jpg not found!")

        # Perform OCR on the image
        result = reader.readtext(IMAGE_PATH)
        if not result:
            print("No text detected.")
            continue

        # Extract the detected text
        detected_text = result[0][1]
        print(f"Detected Text: {detected_text}")

        # Load the image with OpenCV
        img = cv2.imread(IMAGE_PATH)
        if img is None:
            raise ValueError("Failed to load the image.")

        # Draw bounding boxes around detected text
        for (bbox, text, prob) in result:
            (top_left, top_right, bottom_right, bottom_left) = bbox
            top_left = tuple(map(int, top_left))
            bottom_right = tuple(map(int, bottom_right))
            
            # Draw the rectangle
            cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
            
            # Put the text near the box
            cv2.putText(img, text, (top_left[0], top_left[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 
                        0.8, (255, 0, 0), 2, cv2.LINE_AA)

        # Convert image from BGR to RGB for matplotlib
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Display the image using matplotlib
        plt.imshow(img_rgb)
        plt.title("Detected Text")
        plt.axis("off")
        plt.show()

        # Optionally, save the image with annotations
        output_path = os.path.join(BASE_DIR,"output", f"output_{i}.jpg")
        cv2.imwrite(output_path, img)
        print(f"Annotated image saved to: {output_path}")

    except FileNotFoundError as e:
        print(e)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")