import React, { useCallback, useEffect, useRef } from 'react'
import { GiSpeaker } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsFillMicMuteFill } from "react-icons/bs";
import { acceptCall } from '../../features/call/callSlice';
import { FaPhone, FaPhoneSlash } from 'react-icons/fa6';

const IncomingVideoCallModal = ({ callType,handleRejectCall, localStream, callerName, onAccept }) => {

  const localVideoRef = useRef(null);


  useEffect(() => {
    if (localVideoRef.current && localStream)
      localVideoRef.current.srcObject = localStream;

  }, [localStream])




  return (
    <div className='text-white relative  h-130 w-100 ' >
      <div className=' w-full h-full ' >
        <video className='w-full full object-cover' ref={localVideoRef} autoPlay playsInline muted />
      </div>
      <div className='  w-30 h-30  absolute top-30 left-35 '>
        <h1 className='text-4xl font-extrabold text-white'>{callerName}</h1>
      </div>
      <div>
        <div className=' absolute bottom-0  w-full h-20 flex justify-evenly items-center'>

          <button onClick={() => onAccept(callType)} className='hover:scale-120  rounded-4xl flex justify-center items-center bg-green-500 w-15 h-15'>
            <FaPhone className='text-white' size={40} />
          </button>
          <button onClick={() => handleRejectCall()} className='hover:scale-120  rounded-4xl flex justify-center items-center bg-red-500 w-15 h-15'>
            <FaPhoneSlash className='text-white' size={40} />
          </button>



        </div>
      </div>


    </div>
  )
}

export default IncomingVideoCallModal
