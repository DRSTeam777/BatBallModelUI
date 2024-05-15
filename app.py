import subprocess
import shutil
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set the static folder to serve video files
app.static_folder = 'E:/video-player-app/public'

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
        
        # Convert the video file to MP4 format
        if source_path.endswith('.mp4'):
            shutil.move(source_path, destination_path)  # Move the file to public folder
        else:
            # Convert to MP4 using ffmpeg
            mp4_destination_path = destination_path.replace('.avi', '.mp4')
            subprocess.run(['ffmpeg', '-i', source_path, mp4_destination_path])
        
        return result.stdout
    except Exception as e:
        print("Error:", e)
        return None

if __name__ == "__main__":   
    app.run(debug=False)
