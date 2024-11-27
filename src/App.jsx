import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [stream, setStream] = useState(null);
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // get access tp user camera
  const getUserCamera = function () {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // attach the to the video tag
        let video = videoRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
        setStream(stream);
      })
      .catch((err) => console.log("Video is not available", err));
  };

  // take a picture of a user
  const takePhoto = function () {
    // width and height
    let width = 500;
    let height = width / (16 / 9);

    let photo = photoRef.current;
    let video = videoRef.current;

    // set the photo width and height
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photo.width, photo.height);

    stopCamera();
  };

  // Stop the camera stream
  const stopCamera = function () {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop all media tracks
    }
  };

  // clear image
  const clearImage = function () {
    let photo = photoRef.current;

    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  return (
    <>
      <h1>Take a selfie</h1>
      <button onClick={getUserCamera}>Click to open camera</button>
      <video ref={videoRef}></video>
      <button onClick={takePhoto}>Take a selfie</button>
      <canvas ref={photoRef}></canvas>
      <button onClick={clearImage}>Clear Image</button>
    </>
  );
}

export default App;
