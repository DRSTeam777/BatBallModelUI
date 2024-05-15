import React, { useState } from 'react';

const VideoPlayer = () => {
  const [videoFileName, setVideoFileName] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [url, setUrl] = useState("");
  const[loading,setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsValidated(true);
  };

  const handleInputChange = (event) => {
    setVideoFileName(event.target.value);
  };

  const videoPath = process.env.PUBLIC_URL + `/${videoFileName}`;
  async function fetchResult(url) {
    const response = await fetch(`http://127.0.0.1:5000/detect?url=${url}`);
    const data = await response.json();
    console.log(data);
    setLoading(false);

    const prediction = data.prediction; // Access the 'prediction' property from the JSON data
    return prediction;
  }
  return (
    <div className="VideoPlayer">
      <style>{`
        .VideoPlayer {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #6C63FF, #0080FF);
          padding: 2rem;
        }

        .VideoPlayer__container {
          max-width: 800px;
          width: 100%;
          background-color: #fff;
          border-radius: 1rem;
          box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
          overflow: hidden;
        }

        .VideoPlayer__header {
          background-color: #6C63FF;
          color: #fff;
          padding: 1.5rem;
          border-radius: 1rem 1rem 0 0;
        }

        .VideoPlayer__header h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .VideoPlayer__content {
          padding: 1.5rem;
        }

        .VideoPlayer__form {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .VideoPlayer__input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem 0 0 0.5rem;
          font-size: 1rem;
          outline: none;
        }

        .VideoPlayer__button {
          background-color: #6C63FF;
          color: #fff;
          border: none;
          border-radius: 0 0.5rem 0.5rem 0;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .VideoPlayer__button:hover {
          background-color: #5a52d1;
        }

        .VideoPlayer__video {
          width: 100%;
          border-radius: 0 0 1rem 1rem;
          overflow: hidden;
        }

        .VideoPlayer__video-element {
          width: 100%;
          height: auto;
        }
      `}</style>
      <div className="VideoPlayer__container">
        <div className="VideoPlayer__header">
          <h2>Bat and Ball Detection</h2>
        </div>
        <div className="VideoPlayer__content">
          <form onSubmit={handleSubmit} className="VideoPlayer__form">
            <input
              type="text"
              onChange={(event) => setUrl(event.target.value)} 
              placeholder="Enter video filename"
              className="VideoPlayer__input"
            />
            <button type="submit" disabled={loading} onClick={()=>{fetchResult(url) 
            setLoading(true)}} className="VideoPlayer__button">
              {!loading?"Validate":"loading"}
            </button>
          </form>
          {!loading && (
            <div className="VideoPlayer__video">
              <video src={"public/5.mp4"} controls className="VideoPlayer__video-element" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
