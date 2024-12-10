# import os
# import easyocr
# import cv2
# import sys
# import json

# # Initialize the EasyOCR reader
# reader = easyocr.Reader(['en'], gpu=False)

# def recognize_text_from_image(image_path):
#     try:
#         # Check if the image exists
#         if not os.path.exists(image_path):
#             raise FileNotFoundError(f"Image {image_path} not found!")

#         # Perform text recognition using EasyOCR
#         result = reader.readtext(image_path)
#         if not result:
#             return {"detected_text": "", "annotated_image_path": ""}

#         # Extract detected text from the result
#         detected_text = result[0][1]

#         # Read the image for annotation
#         img = cv2.imread(image_path)
#         if img is None:
#             raise ValueError("Failed to load the image.")

#         # Annotate the image with bounding boxes and detected text
#         for (bbox, text, prob) in result:
#             (top_left, top_right, bottom_right, bottom_left) = bbox
#             top_left = tuple(map(int, top_left))
#             bottom_right = tuple(map(int, bottom_right))

#             # Draw bounding box and put text
#             cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
#             cv2.putText(img, text, (top_left[0], top_left[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 
#                         0.8, (255, 0, 0), 2, cv2.LINE_AA)

#         # Convert the image to RGB for saving and displaying
#         img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#         # Save the annotated image
#         output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
#         os.makedirs(output_dir, exist_ok=True)
#         output_image_path = os.path.join(output_dir, "output_annotated_image.jpg")
#         cv2.imwrite(output_image_path, img)

#         return {"detected_text": detected_text, "annotated_image_path": output_image_path}
    
#     except FileNotFoundError as e:
#         print(e)
#         return {"detected_text": "", "annotated_image_path": ""}
#     except Exception as e:
#         print(f"An unexpected error occurred: {e}")
#         return {"detected_text": "", "annotated_image_path": ""}

# if __name__ == "__main__":
#     # Get the image path from command-line arguments
#     image_path = sys.argv[1]
    
#     # Call the function and print the result as a JSON string
#     result = recognize_text_from_image(image_path)
#     print(json.dumps(result))  # Print the result as JSON


import os
import easyocr
import cv2
import sys
import json
from datetime import datetime

# Initialize the EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

def recognize_text_from_image(image_path):
    try:
        # Check if the image exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image {image_path} not found!")

        # Perform text recognition using EasyOCR
        result = reader.readtext(image_path)
        if not result:
            return {"detected_text": "", "annotated_image_path": "", "error": "No text detected"}

        # Extract detected text from the result
        detected_text = result[0][1]

        # Read the image for annotation
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Failed to load the image.")

        # Annotate the image with bounding boxes and detected text
        for (bbox, text, prob) in result:
            (top_left, top_right, bottom_right, bottom_left) = bbox
            top_left = tuple(map(int, top_left))
            bottom_right = tuple(map(int, bottom_right))

            # Draw bounding box and put text
            cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
            cv2.putText(img, text, (top_left[0], top_left[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 
                        0.8, (255, 0, 0), 2, cv2.LINE_AA)

        # Convert the image to RGB for saving and displaying
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Create a unique output path with timestamp to avoid overwriting
        output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
        os.makedirs(output_dir, exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        output_image_path = os.path.join(output_dir, f"output_annotated_image_{timestamp}.jpg")

        # Save the annotated image
        cv2.imwrite(output_image_path, img)

        return {"detected_text": detected_text, "annotated_image_path": output_image_path, "error": None}
    
    except FileNotFoundError as e:
        print(e)
        return {"detected_text": "", "annotated_image_path": "", "error": str(e)}
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"detected_text": "", "annotated_image_path": "", "error": str(e)}

if __name__ == "__main__":
    # Get the image path from command-line arguments
    image_path = sys.argv[1]
    
    # Call the function and print the result as a JSON string
    result = recognize_text_from_image(image_path)
    print(json.dumps(result))  # Print the result as JSON
