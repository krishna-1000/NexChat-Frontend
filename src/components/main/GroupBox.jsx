import React from 'react'
import useChat from '../../hooks/useChat';
import { useDispatch } from 'react-redux';
import { CiAlarmOn } from 'react-icons/ci';
import { setSelectedUserId, setSelectedUserName } from '../../features/chat/chatSlice';
import { setGroupAdmin, setGroupName, setSelectedGroup } from '../../features/chat/groupSlice';

const GroupBox = ({ id, username }) => {
    const dispatch = useDispatch();
    const { getChatroomGroup } = useChat();

    const handelSelectGroup = () => {
        dispatch(setSelectedUserId(""))
        dispatch(setSelectedGroup(id));
        dispatch(setGroupName(username))

        getChatroomGroup(id);

    }
    return (
        <div key={id} className=' w-full pr-2 flex justify-start items-center gap-1 h-12 rounded-2xl hover:bg-gray-800'>
            {/* logo */}
            <div className='flex justify-center items-center bg-yellow-400 h-9 w-10 rounded-2xl border-black'>
                <CiAlarmOn className='text-white ' size={30} />
            </div>
            <div onClick={() => handelSelectGroup()} className=' rounded-2xl  w-full cursor-pointer '>
                <div className=' flex justify-between items-center rounded-2xl'>
                    <div className='font-mono text-cyan-100'>{username}</div>
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

export default GroupBox
