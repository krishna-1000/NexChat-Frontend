import React, { useCallback, useEffect, useRef } from 'react'
import { GiSpeaker } from "react-icons/gi";
import { ImPhoneHangUp } from "react-icons/im";
import { BsFillMicMuteFill } from "react-icons/bs";
import { acceptCall } from '../../features/call/callSlice';
import { FaPhone, FaPhoneSlash } from 'react-icons/fa6';

const IncomingCallModal = ({ callType, handleRejectCall, localStream, callerName, onAccept }) => {

  const localVideoRef = useRef(null);


  useEffect(() => {
    if (localVideoRef.current && localStream)
      localVideoRef.current.srcObject = localStream;

  }, [localStream])




  return (
    <div className='text-white flex flex-col h-90 md:h-130 w-full md:w-100 justify-between items-center' >
      
      <div className='  w-full h-30   '>
        <h1 className='text-4xl font-extrabold w-full h-40 flex justify-start items-center  text-white'>{
          callerName ? callerName : "Unknown Call"
        }</h1>
      </div>
      <div>
        <div className='  w-full h-20 flex justify-between items-start'>

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

export default IncomingCallModal
