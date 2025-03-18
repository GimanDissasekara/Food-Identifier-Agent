from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
try:
    model = tf.keras.models.load_model('./public/models/Foods.h5')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Class names that match your model's output classes
class_names = [
    "tomato", "banana", "bell pepper", "broccoli", "carrot", 
    "chicken", "cucumber", "egg", "garlic", "ginger",
    "lemon", "onion", "potato", "rice"
]

@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    try:
        # Get the image data from the request
        image_data = request.json.get('image')
        if not image_data:
            return jsonify({"error": "No image data provided"}), 400
        
        # Decode base64 image
        image_data = image_data.split(',')[1] if ',' in image_data else image_data
        image_bytes = base64.b64decode(image_data)
        
        # Open and preprocess the image
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image = image.resize((224, 224))  # Resize to match model's expected input size
        
        # Convert to numpy array and normalize
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        # Make prediction
        predictions = model.predict(img_array)[0]
        
        # Get top 3 predictions
        top_indices = predictions.argsort()[-3:][::-1]
        results = [
            {"name": class_names[i], "probability": float(predictions[i] * 100)}
            for i in top_indices
        ]
        
        return jsonify({"predictions": results})
    
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
