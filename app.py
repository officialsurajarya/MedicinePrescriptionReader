from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import numpy as np
import cv2
import joblib  # Use joblib instead of pickle for label encoder
from tensorflow.keras.models import load_model

# Initialize Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load CNN model and LabelEncoder
cnn_model = load_model('cnn_model.h5')
le = joblib.load('label_encoder.pkl')  # Load properly saved encoder
characters = le.classes_

# Get model input size
_, IMG_HEIGHT, IMG_WIDTH, _ = cnn_model.input_shape

# Image preprocessing
def preprocess_image(path):
    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (IMG_WIDTH, IMG_HEIGHT))
    img = img.astype(np.float32) / 255.0
    return np.expand_dims(img, axis=(0, -1))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files.get('image')
    if not file or file.filename == '':
        return render_template('index.html', prediction="No image uploaded.")

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    x = preprocess_image(filepath)
    prediction = cnn_model.predict(x)[0]
    index = np.argmax(prediction)
    text = characters[index]

    return render_template('index.html', prediction=text, image_path=filepath)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
