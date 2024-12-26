import React from 'react';
import MainDetails from './Components/MainDetails';
import back from './assets/back.mp4';

function App() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Fullscreen Video */}
      <video autoPlay muted loop id="myVideo" className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={back} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <div className="w-full flex justify-between p-5 text-white text-2xl">
          <p className="font-semibold">Weather Dashboard</p>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div className="w-10/12 h-5/6 bg-transparent border-2 border-orange-50 rounded-lg">
          <MainDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
