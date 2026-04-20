import React from 'react'
import { CiAlarmOn } from 'react-icons/ci';

const RecieveMessage = ({ message, username }) => {
  if (!message) {
    return;
  }
  return (
    <>
      <div className='bg-gray-900  w-1/2 h-fit flex gap-2 justify-start'>
        <div className='w-12 h-12 rounded-4xl bg-cyan-400 flex justify-center items-center self-end'>
          <CiAlarmOn />
        </div>
        <div className='text-white group flex-1 flex flex-col justify-start text-wrap self-start'>

          <span className='w-fit font-extralight  text-white text-sm rounded-2xl min-w-10 text-center '>{username}</span>
          <p className='w-full bg-gray-800 p-2  rounded-tr-3xl rounded-br-3xl rounded-tl-3xl flex justify-start items-center'> {message}</p>
          <span className='w-fit rounded-2xl ml-1 bg-black text-white text-xs invisible group-hover:visible'>11:02 am</span>
        </div>
      </div>
    </>
  )
}

export default RecieveMessage
