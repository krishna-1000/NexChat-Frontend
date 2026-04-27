import React from 'react'
import { CiAlarmOn } from 'react-icons/ci';
import Avatar from './Avatar';

const RecieveMessage = ({selectedUser,sentAt,messageType, message, username }) => {
  if (!message) {
    return;
  }
  return (
    <>
      <div className='bg-gray-900  w-1/2 h-fit flex gap-2 justify-start'>
        <div className='w-12 h-12 rounded-4xl bg-cyan-400 flex justify-center items-center self-end'>
          <Avatar username={username}/>
        </div>
        <div className='text-white group flex-1 flex flex-col justify-start text-wrap self-start'>

          <span className={`${selectedUser == username?'hidden':'visible'} w-fit font-extralight  text-white text-sm rounded-2xl min-w-10 text-center `}>{username}</span>
          <p className={`${(messageType == 'missed-call')?'bg-red-400 pt-4 pb-4':'bg-gray-800'} w-fit self-start bg-gray-800 p-2  rounded-tr-3xl rounded-br-3xl rounded-tl-3xl flex justify-start items-center`}> {message}</p>
          <span className='w-fit rounded-2xl ml-1 bg-black text-white text-xs invisible group-hover:visible'>{(sentAt).substring(11, 20)}</span>
        </div>
    
      </div>
    </>
  )
}

export default RecieveMessage
