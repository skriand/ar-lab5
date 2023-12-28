import { useState, useEffect } from 'react';

const LocationScene = () =>{
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude)
    });
  });

  return (
    <>
      <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
        <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
        <a-entity material='color: red' geometry='primitive: box' gps-new-entity-place={`latitude: ${latitude+0.001}; longitude: ${longitude}`} scale="10 10 10"></a-entity>
      </a-scene>
      <button style={{position: 'fixed'}}>Add new box</button>
    </>
  );
}

export default LocationScene;