import React, { useCallback, useEffect, useRef } from 'react'
import { GiSpeaker } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsFillMicMuteFill } from "react-icons/bs";
import { acceptCall } from '../../features/call/callSlice';

const IncomingVideoCallModal = ({localStream, callerName,onAccept }) => {

  const localVideoRef = useRef(null);
  

  useEffect(()=>{
    if(localVideoRef.current && localStream)
    localVideoRef.current.srcObject = localStream;

  },[localStream])


  

  return (
    <div className='text-white bg-cyan-300 h-120 w-110 flex flex-col justify-between'>
      <div className='flex justify-between'>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>MY STREAM</label>
          <video ref={localVideoRef} autoPlay muted style={{ width: '150px', backgroundColor: 'black' }} />

        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>opponent {callerName}</label>
          <video autoPlay muted style={{ width: '150px', backgroundColor: 'black' }} /></div>
      </div>
      <div>
        <div className='bg-green-300 w-full h-20 flex justify-evenly'>
          <button className='hover:scale-120 bg-red-500'>
            <GiSpeaker />
          </button>
          <button onClick={() => onAccept()} className='hover:scale-120  rounded-2xl bg-green-400'>
            <ImPhoneHangUp />
          </button>

        </div>
      </div>

    </div>
  )
}

export default IncomingVideoCallModal
