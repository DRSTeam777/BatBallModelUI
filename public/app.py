import subprocess
import shutil
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

VIDEO_FOLDER = 'E:/video-player-app/public'

@app.route('/') 
def index():
    return "<center><h1>To use the API put / followed by your text on the root url!</h1></center>"

@app.route('/detect', methods=['GET']) 
def detect():
    url = request.args.get('url')
    output = run_detection(url)
    return jsonify({'data': output}) 

def run_detection(url):
    try:
        # Command for running detection
        command = [
            "python", 
            "detect.py",
            "--weights", "best.pt",
            "--source", url
        ]
        print(url)
        
        # Run detection process
        result = subprocess.run(command, cwd="E:/Cricket_bat_ball_detection/ObjectDetection/yolov5", capture_output=True, text=True)
        
        # Get filename from URL
        filename = url.split('/')[-1]
        
        # Source and destination paths
        source_path = f"E:/Cricket_bat_ball_detection/ObjectDetection/yolov5/runs/detect/exp/{filename}"
        destination_path = "E:/video-player-app/public/" + filename
        
        # Copy the processed video to the public folder
        shutil.copy(source_path, destination_path)
        
        return result.stdout
    except Exception as e:
        print("Error:", e)
        return None

@app.route('/video/<filename>')
def serve_video(filename):
    print("Serving video from:", VIDEO_FOLDER)
    return send_from_directory(VIDEO_FOLDER, filename)

if __name__ == "__main__":   
    app.run(debug=False, host='0.0.0.0')
