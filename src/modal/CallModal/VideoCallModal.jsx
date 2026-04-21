import React, { useEffect, useRef, useState } from 'react';
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { BsCameraVideo, BsCameraVideoOff, BsFillMicMuteFill } from "react-icons/bs";
import { FaMicrophone, FaPhoneSlash } from 'react-icons/fa6';
import { FiMaximize, FiMinimize } from "react-icons/fi";

const VideoCallModal = ({ muteVideo, muteVoice, hangUpCall, remoteStream, localStream }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null); // Renamed from remotelocalVideoRef for clarity
  const fullScreenRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(true);
  const [switchStream, setSwitchStream] = useState(false);
  const [callData, setCallData] = useState({
    voiceMute: false,
    videoMute: false,
    fullScreen: false,
    speaker: false
  });

  // Attach streams strictly once when they are available
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Mobile Safe Play: explicitly call play() once metadata loads
  const handleLoadedMetadata = (e) => {
    e.target.play().catch(err => console.error("Mobile play blocked:", err));
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      fullScreenRef.current.requestFullscreen().catch(() => alert("Cannot maximize"));
      setCallData((prev) => ({ ...prev, fullScreen: true }));
    } else {
      document.exitFullscreen();
      setCallData((prev) => ({ ...prev, fullScreen: false }));
    }
  };

  // Define CSS layouts for the Background (Main) and Foreground (Floating) videos
  const bgClass = "absolute inset-0 z-0 w-full h-full object-cover";
  const floatingClass = "absolute right-4 bottom-24 w-28 h-40 z-10 cursor-pointer shadow-lg rounded-xl border-2 border-gray-600 bg-black object-cover";

  return (
    <div ref={fullScreenRef} className='text-white relative h-screen w-full bg-gray-900'>
      
      {/* Click overlay to toggle controls */}
      <div className="absolute inset-0 z-0" onClick={() => setIsVisible(!isVisible)} />

      {/* REMOTE VIDEO */}
      <video
        ref={remoteVideoRef}
        className={switchStream ? floatingClass : bgClass}
        autoPlay
        playsInline // Critical for iOS
        onLoadedMetadata={handleLoadedMetadata}
        onClick={() => switchStream && setSwitchStream(false)} // Only clickable if it's the floating one
      />

      {/* LOCAL VIDEO */}
      <video
        ref={localVideoRef}
        className={!switchStream ? floatingClass : bgClass}
        autoPlay
        playsInline // Critical for iOS
        muted       // Always muted to prevent echo
        onLoadedMetadata={handleLoadedMetadata}
        onClick={() => !switchStream && setSwitchStream(true)} // Only clickable if it's the floating one
      />

      {/* CONTROLS BAR */}
      <div className={`absolute bottom-0 w-full p-4 z-20 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className='w-full h-16 bg-gray-950/80 backdrop-blur-md rounded-2xl flex justify-evenly items-center px-2 shadow-xl'>
          
          <button onClick={() => {
            muteVoice(localStream);
            setCallData(prev => ({ ...prev, voiceMute: !callData.voiceMute }));
          }} className='hover:scale-110 bg-gray-800 rounded-full p-3 transition-transform'>
            {callData.voiceMute ? <BsFillMicMuteFill size={20} color="#ef4444" /> : <FaMicrophone size={20} />}
          </button>
          
          <button onClick={() => {
            muteVideo(localStream);
            setCallData(prev => ({ ...prev, videoMute: !callData.videoMute }));
          }} className='hover:scale-110 bg-gray-800 rounded-full p-3 transition-transform'>
            {callData.videoMute ? <BsCameraVideoOff size={20} color="#ef4444" /> : <BsCameraVideo size={20} />}
          </button>
          
          <button onClick={() => hangUpCall()} className='hover:scale-110 rounded-full flex justify-center items-center bg-red-600 w-14 h-14 shadow-lg shadow-red-500/50 transition-transform'>
            <FaPhoneSlash className='text-white' size={24} />
          </button>
          
          <button onClick={() => setCallData(prev => ({ ...prev, speaker: !callData.speaker }))} className='hover:scale-110 bg-gray-800 rounded-full p-3 transition-transform'>
            {callData.speaker ? <GiSpeakerOff size={20} /> : <GiSpeaker size={20} />}
          </button>
          
          <button onClick={() => {
            toggleFullScreen();
          }} className='hover:scale-110 bg-gray-800 rounded-full p-3 transition-transform'>
            {callData.fullScreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;