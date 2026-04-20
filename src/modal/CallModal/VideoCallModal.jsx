import React, { useEffect, useRef, useState } from 'react'
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsCameraVideo, BsCameraVideoOff, BsFillMicMuteFill } from "react-icons/bs";
import useVideoCall from '../../hooks/useVideoCall';
import { FaMicrophone, FaPhoneSlash } from 'react-icons/fa6';
import { FiMaximize, FiMinimize } from "react-icons/fi";


const VideoCallModal = ({ muteVideo, muteVoice, hangUpCall, remoteStream, localStream }) => {
  const localVideoRef = useRef(null);
  const remotelocalVideoRef = useRef(null);
  const fullScreenRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [switchStream, setSwitchStream] = useState(false);
  const [callData, setCallData] = useState({
    voiceMute: false,
    videoMute: false,
    fullScreen: false,
    speaker: false
  });
  useEffect(() => {
    console.debug("thisis remoteStream")

    if (remotelocalVideoRef.current && remoteStream)
      remotelocalVideoRef.current.srcObject = remoteStream;
  }, [remoteStream])

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const toggleFullScreen = () => {

    if (!document.fullscreenElement) {
      fullScreenRef.current.requestFullscreen().catch((error) => alert("cannot maximize"))
      setCallData((prev) => ({ ...prev, fullScreen: true }))
    }
    else {
      document.exitFullscreen();
      setCallData((prev) => ({ ...prev, fullScreen: false }))
    }
  }


  return (
    <div ref={fullScreenRef} className='text-white relative  h-130 w-100 ' >
      <div className=' w-full h-full ' onClick={() => setIsVisible(!isVisible)}>

        {
          switchStream ? <video className='w-full h-full object-cover' ref={localVideoRef} autoPlay playsInline muted />
            : <video className='w-full h-full object-cover ' ref={remotelocalVideoRef} autoPlay />

        }


      </div>
      <div className='  w-30 h-30  absolute right-4 bottom-20' onClick={() => setSwitchStream(!switchStream)}>
        {
          switchStream ? <video className='w-full h-full object-cover rounded-3xl border-black border-2' ref={remotelocalVideoRef} autoPlay />
            : <video className='w-full h-full  object-cover rounded-3xl border-black border-2' ref={localVideoRef} autoPlay playsInline muted />

        }


      </div>
      <div className={isVisible == true ? 'visible' : 'hidden'}>
        <div className=' absolute bottom-0  w-full h-20 flex justify-evenly items-center'>
          <button onClick={() => {
            muteVoice(localStream)
            setCallData(prev => ({ ...prev, voiceMute: !callData.voiceMute }))
          }} className='hover:scale-120 hover:bg-gray-800 bg-gray-950 rounded-4xl p-1'>
            {
              callData.voiceMute ? <BsFillMicMuteFill size={25} /> : <FaMicrophone size={25} />
            }
          </button>
          <button onClick={() => {
            muteVideo(localStream)
            setCallData(prev => ({ ...prev, videoMute: !callData.videoMute }))

          }} className=' hover:bg-gray-800 bg-gray-950 rounded-4xl hover:scale-120 p-1'>
            {
              callData.videoMute ? <BsCameraVideoOff size={25} /> : <BsCameraVideo size={25} />
            }

          </button>
          <button onClick={() => hangUpCall()} className='hover:scale-120  rounded-4xl flex justify-center items-center bg-red-500 w-15 h-15'>
            <FaPhoneSlash className='text-white' size={40} />
          </button>
          <button onClick={() => {

            setCallData(prev => ({ ...prev, speaker: !callData.speaker }))

          }} className='hover:scale-120 hover:bg-gray-800 bg-gray-950 rounded-4xl p-1'>

            {
              callData.speaker ? <GiSpeakerOff size={25} /> : <GiSpeaker size={25} />
            }
          </button>
          <button onClick={() => {
            toggleFullScreen();
            setCallData(prev => ({ ...prev, fullScreen: !callData.fullScreen }))

          }} className='hover:scale-120 hover:bg-gray-800 bg-gray-950 rounded-4xl p-1'>

            {
              callData.fullScreen ? <FiMaximize size={25} /> : <FiMinimize size={25} />
            }
          </button>

        </div>
      </div>


    </div>
  )
}

export default VideoCallModal
