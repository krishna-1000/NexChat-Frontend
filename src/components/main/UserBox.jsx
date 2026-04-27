import React from 'react'
import { CiAlarmOn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUserId,setSelectedUserName } from '../../features/chat/chatSlice'
import useChat from '../../hooks/useChat'
import { setSelectedGroup } from '../../features/chat/groupSlice'
import { setIsModalOpen, setType } from '../../features/modal/modalSlice'
import Avatar from './Avatar'

const UserBox = ({userEmail, id, username }) => {
    const dispatch = useDispatch();  
  
    const {getChatroom} = useChat();

    const handelSelectUser = ()=>{
        dispatch(setSelectedGroup(""))
        dispatch(setSelectedUserId(id));
        dispatch(setSelectedUserName(username))
        
        getChatroom(id);

    }
    return (
        <div key={id} className=' w-full pr-2 flex justify-start items-center gap-1 h-12 rounded-2xl hover:bg-gray-800'>
            <Avatar username={username}/>
            <div onClick={()=>handelSelectUser()} className=' rounded-2xl  w-full cursor-pointer '>
                <div className=' flex justify-between items-center rounded-2xl'>
                    <div  className='font-mono text-cyan-100'>{username}</div>
                    
                </div>
                <div className=' text-black flex justify-between rounded-2xl '>
                    <div className='text-sm ml-2 w-25 md:w-40 truncate text-white'>{userEmail}</div>
                </div>
            </div>
        </div>
    )
}

export default UserBox
