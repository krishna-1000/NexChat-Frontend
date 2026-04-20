import React from 'react'
import { CiAlarmOn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUserId,setSelectedUserName } from '../../features/chat/chatSlice'
import useChat from '../../hooks/useChat'
import { setSelectedGroup } from '../../features/chat/groupSlice'
import { setIsModalOpen, setType } from '../../features/modal/modalSlice'

const UserBox = ({ id, username }) => {
    const dispatch = useDispatch();  
    const allMessages = useSelector((state) => state.chat.chatMessages);
      const roomId = useSelector((state) => state.chat.chatRoomId);
    
    const currentRoomMessages = allMessages[roomId];

    const {getChatroom} = useChat();

    const handelSelectUser = ()=>{
        dispatch(setSelectedGroup(""))
        dispatch(setSelectedUserId(id));
        dispatch(setSelectedUserName(username))
        console.info("this i s inofrmttion")
        console.log(currentRoomMessages)
        getChatroom(id);

    }
    return (
        <div key={id} className=' w-full pr-2 flex justify-start items-center gap-1 h-12 rounded-2xl hover:bg-gray-800'>
            {/* logo */}
            <div className='flex justify-center items-center bg-yellow-400 h-9 w-10 rounded-2xl border-black'>
                <CiAlarmOn onClick={()=>{
                    dispatch(setType("Profile"))
                    dispatch(setIsModalOpen(true))
                }} className='text-white ' size={30} />
            </div>
            <div onClick={()=>handelSelectUser()} className=' rounded-2xl  w-full cursor-pointer '>
                <div className=' flex justify-between items-center rounded-2xl'>
                    <div  className='font-mono text-cyan-100'>{username}</div>
                    <div className='text-xs '>1 hour</div>
                </div>
                <div className=' text-black flex justify-between rounded-2xl '>
                    <div className='text-sm ml-2 text-white'>this is my note for cha.</div>
                    <div className='text-xs rounded-2xl mr-2  bg-green-400 w-3 h-4 flex justify-center items-center font-extrabold text-white'>7</div>
                </div>
            </div>
        </div>
    )
}

export default UserBox

// return (
//     <div key={id} className='flex items-center h-14 px-2 py-1 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors duration-200 group'>
        
//         {/* Avatar */}
//         <div className='flex items-center justify-center w-9 h-9 rounded-full bg-cyan-950 border-2 border-cyan-800 shrink-0 mr-3'>
//             <span className='text-cyan-400 font-bold font-mono text-xs uppercase'>
//                 {username?.charAt(0)}{username?.charAt(1)}
//             </span>
//         </div>

//         {/* Info */}
//         <div onClick={() => handelSelectUser()} className='flex flex-col flex-1 min-w-0'>
//             <div className='flex justify-between items-center'>
//                 <span className='text-sm font-semibold text-gray-200 truncate'>{username}</span>
//                 <span className='text-xs font-mono text-gray-600 shrink-0 ml-2'>1h ago</span>
//             </div>
//             <div className='flex justify-between items-center mt-0.5'>
//                 <span className='text-xs font-mono text-gray-500 truncate'>this is my note for chat..</span>
//                 <span className='ml-2 shrink-0 min-w-4 h-4 px-1 rounded-full bg-cyan-500 text-gray-950 text-xs font-bold font-mono flex items-center justify-center'>
//                     7
//                 </span>
//             </div>
//         </div>

//     </div>
// )