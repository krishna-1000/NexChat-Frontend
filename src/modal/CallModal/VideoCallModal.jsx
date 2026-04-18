import React, { useEffect, useRef } from 'react'
import { GiSpeaker } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsFillMicMuteFill } from "react-icons/bs";
import useVideoCall from '../../hooks/useVideoCall';

const VideoCallModal = ({muteVideo,muteVoice,hangUpCall, remoteStream, localStream }) => {
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
 
  useEffect(() => {
    console.debug("thisis remoteStream")

    if (remoteVideoRef.current && remoteStream)
      remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream])

  useEffect(() => {
    if (videoRef.current && localStream) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);



  return (
    <div className='text-white bg-cyan-300 h-120 w-110 flex flex-col justify-between'>
      <div className='flex justify-between'>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>MY STREAM</label>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '150px', backgroundColor: 'black' }} />

        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>opponent</label>
          <video ref={remoteVideoRef} autoPlay  style={{ width: '150px', backgroundColor: 'black' }} />
        </div>
      </div>
      <div>
        <div className='bg-green-300 w-full h-20 flex justify-evenly'>
          <button className='hover:scale-120'>
            <GiSpeaker />
          </button>
          <button onClick={()=>hangUpCall()} className='hover:scale-120  rounded-2xl'>
            <ImPhoneHangUp />
          </button>
          <button onClick={()=>muteVoice(localStream)} className='hover:scale-120'>
            <BsFillMicMuteFill />
          </button>
          <button onClick={()=>muteVideo(localStream)} className=' bg-red-500 hover:scale-120'>
            <BsFillMicMuteFill />
          </button>
        </div>
      </div>

    </div>
  )
}

export default VideoCallModal
