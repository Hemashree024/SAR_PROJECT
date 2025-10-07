from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
import time
import sys
import os
import cv2
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from modules.building_detection.predict import load_model as load_building_model, predict_building
from modules.road_detection.predict import load_model as load_road_model, predict_image as predict_road
from modules.colorization.predict import predict as predict_colorization

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
PROCESSED_FOLDER = os.path.join(os.path.dirname(__file__), 'processed')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size

# Simple rate limiting (in production, use proper rate limiter)
request_counts = {}

def check_rate_limit():
    client_ip = request.remote_addr
    current_time = time.time()
    if client_ip not in request_counts:
        request_counts[client_ip] = []
    request_counts[client_ip] = [t for t in request_counts[client_ip] if current_time - t < 60]  # Last minute
    if len(request_counts[client_ip]) >= 10:  # Max 10 requests per minute
        return False
    request_counts[client_ip].append(current_time)
    return True

@app.route('/upload', methods=['POST'])
def upload_file():
    if not check_rate_limit():
        return jsonify({'error': 'Rate limit exceeded'}), 429

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = str(uuid.uuid4()) + '_' + filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'filename': unique_filename}), 200
    return jsonify({'error': 'File type not allowed'}), 400

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/process/<feature>', methods=['POST'])
def process_image(feature):
    if not check_rate_limit():
        return jsonify({'error': 'Rate limit exceeded'}), 429

    data = request.get_json()
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    try:
        if feature == 'building':
            model, device = load_building_model()
            image, mask = predict_building(file_path, model, device)
            processed_path = os.path.join(PROCESSED_FOLDER, 'building_' + filename)
            cv2.imwrite(processed_path, mask)
        elif feature == 'road':
            try:
                model = load_road_model()
                mask = predict_road(file_path)
                processed_path = os.path.join(PROCESSED_FOLDER, 'road_' + filename)
                cv2.imwrite(processed_path, mask)
            except Exception as e:
                print(f"[ERROR] Road detection failed: {str(e)}")
                raise e
        elif feature == 'colorization':
            # Fix output_dir to PROCESSED_FOLDER to match backend folder
            processed_path = predict_colorization(file_path, output_dir=PROCESSED_FOLDER)
            # Ensure processed_path has .png extension if missing
            if not processed_path.lower().endswith('.png'):
                processed_path += '.png'
            # Debug log to verify file existence
            print(f"[DEBUG] Colorization processed image path: {processed_path}")
            print(f"[DEBUG] File exists: {os.path.exists(processed_path)}")
            if not os.path.exists(processed_path):
                print(f"[ERROR] Processed image file not found: {processed_path}")
        else:
            return jsonify({'error': 'Invalid feature'}), 400

        return jsonify({'message': 'Processing complete', 'processed_filename': os.path.basename(processed_path)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/processed/<filename>', methods=['GET'])
def get_processed_file(filename):
    file_path = os.path.join(PROCESSED_FOLDER, filename)
    print(f"[DEBUG] Serving file: {file_path}")
    print(f"[DEBUG] File exists: {os.path.exists(file_path)}")
    if os.path.exists(file_path):
        return send_file(file_path)
    return jsonify({'error': 'File not found'}), 404

@app.route('/', methods=['GET'])
def root():
    return "Backend API is running. Use /upload, /process/<feature>, /processed/<filename> endpoints."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
