import React, { useEffect, useRef, useState } from 'react'
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsCameraVideo, BsCameraVideoOff, BsFillMicMuteFill } from "react-icons/bs";
import useVideoCall from '../../hooks/useVideoCall';
import { FaMicrophone, FaPhoneSlash } from 'react-icons/fa6';
import { FiMaximize, FiMinimize } from "react-icons/fi";


const VoiceCallModal = ({ muteVideo, muteVoice, hangUpCall, remoteStream, localStream }) => {
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [callData, setCallData] = useState({
    voiceMute: false,
    videoMute: false,
    fullScreen: false,
    speaker: false
  });
  useEffect(() => {
    console.debug("thisis remoteStream")

    if (remoteAudioRef.current && remoteStream)
      remoteAudioRef.current.srcObject = remoteStream;
  }, [remoteStream])

  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream;
    }
  }, [localStream]);




  return (
    <div className='text-white relative  h-130 w-full md:w-100  ' >
      <div className=' w-full h-full  flex justify-center  ' onClick={() => setIsVisible(!isVisible)}>

        <label className=' h-60 w-full flex flex-col gap-0.5 justify-center items-center'>
          <span className='font-bold font-mono text-4xl'>raj</span> <span className=' font-light'>calling....</span></label>
          <audio ref={localAudioRef} muted autoPlay ></audio>
          <audio ref={remoteAudioRef} autoPlay></audio>

      </div>
    
      <div className={isVisible == true ? 'visible' : 'hidden'}>
        <div className=' absolute bottom-0  w-full h-20  flex  justify-evenly items-center'>
          <button onClick={() => {
            muteVoice(localStream)
            setCallData(prev => ({ ...prev, voiceMute: !callData.voiceMute }))
          }} className='hover:scale-120 hover:bg-gray-800 bg-gray-950 rounded-4xl p-1'>
            {
              callData.voiceMute ? <BsFillMicMuteFill size={25} /> : <FaMicrophone size={25} />
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
        

        </div>
      </div>


    </div>
  )
}

export default VoiceCallModal
