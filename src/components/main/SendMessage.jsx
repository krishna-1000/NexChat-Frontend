import React from 'react'
import { CiAlarmOn } from 'react-icons/ci'

const SendMessage = ({ messageType, sentAt, message }) => {

  return (
    <>
      <div className='bg-gray-900  w-1/2 h-fit flex gap-2 '>

        <div className='text-white group flex-1 flex flex-col justify-end text-wrap mr-3'>

          <p className={`${(messageType == 'missed-call') ? 'bg-red-400 pt-4 pb-4 ' : 'bg-green-800 '} w-fit self-end   p-2  rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl flex justify-end items-center`}>
            {
              (messageType == 'missed-call') ? 'Missed Call' : message
            }
          </p>
          <span className='w-fit rounded-2xl ml-1 bg-black self-end text-white text-xs invisible group-hover:visible'>{(sentAt).substring(11, 20)}</span>
        </div>

      </div>
    </>
  )
}

export default SendMessage
