import React from 'react'

const SendMessage = ({ message }) => {
  return (
    <div className='bg-green-600 w-1/2 h-fit flex justify-end gap-2'>

      <div className='text-white flex justify-start items-center text-wrap'>
        {message}
      </div>
      <div className='w-12 h-12 rounded-4xl bg-cyan-400 flex items-center justify-center'>
        Icon
      </div>
    </div>
  )
}

export default SendMessage
