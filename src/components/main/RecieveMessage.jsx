import React from 'react'

const RecieveMessage = ({ message, username }) => {
  if (!message) {
    return;
  }
  return (
    <>
    <label className='text-black bg-yellow-300 w-fit'>{username}</label>
      <div className='bg-orange-400 self-end w-1/2 h-fit flex justify-start'>
        <div className='w-12 h-12 rounded-4xl bg-cyan-400 flex justify-center items-center'>
          Icon
        </div>
        <div className='text-white flex justify-start items-center text-wrap'>
          {message}
        </div>
      </div>
    </>
  )
}

export default RecieveMessage
