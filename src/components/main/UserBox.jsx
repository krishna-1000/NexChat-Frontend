import React from 'react'
import { CiAlarmOn } from 'react-icons/ci'

const UserBox = ({ setMember, id, username }) => {
    return (
        <div key={id} className='bg-red-400 flex justify-start items-center h-12 rounded-2xl'>
            {/* logo */}
            <div className='flex justify-center items-center bg-yellow-400 h-full w-10 rounded-2xl border-black'>
                <CiAlarmOn className='text-white ' size={30} />
            </div>
            <div onClick={() => setMember(username)} className='bg-pink-500  w-full cursor-pointer'>
                <div className='bg-black flex justify-between'>
                    <div  className='font-bold'>{username}</div>
                    <div className='text-xs'>1 hour</div>
                </div>
                <div className='bg-white text-black flex justify-evenly'>
                    <div className='text-sm self-start'>this is my note for chat..</div>
                    <div className='text-xs rounded-b-full   bg-green-400 w-3'>7</div>
                </div>
            </div>
        </div>
    )
}

export default UserBox
