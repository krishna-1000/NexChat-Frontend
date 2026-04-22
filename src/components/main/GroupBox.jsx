import React from 'react'
import useChat from '../../hooks/useChat';
import { useDispatch, useSelector } from 'react-redux';
import { CiAlarmOn } from 'react-icons/ci';
import { setSelectedUserId, setSelectedUserName } from '../../features/chat/chatSlice';
import { setGroupAdmin, setGroupName, setSelectedGroup } from '../../features/chat/groupSlice';
import { setIsModalOpen, setType } from '../../features/modal/modalSlice';

const GroupBox = ({ id, username }) => {
    const dispatch = useDispatch();
    const { getChatroomGroup } = useChat();
    const { groups } = useSelector((state) => state.group);

    const handelSelectGroup = () => {
        dispatch(setSelectedUserId(""))
        dispatch(setSelectedGroup(id));
        dispatch(setGroupName(username))

        getChatroomGroup(id);

    }
    return (
        <div onClick={() => handelSelectGroup()} key={id} className=' w-full pr-2 flex justify-start items-center gap-1 h-12 rounded-2xl hover:bg-gray-800'>
            {/* logo */}
            <div className='flex justify-center items-center bg-yellow-400 h-9 w-10 rounded-2xl border-black'>
                <CiAlarmOn onClick={() => {
                    dispatch(setIsModalOpen(true))
                    dispatch(setType("GroupProfile"))
                }} className='text-white ' size={30} />
            </div>
            <div className=' rounded-2xl  w-full cursor-pointer '>
                <div className=' flex justify-between items-center rounded-2xl'>
                    <div className='font-mono text-cyan-100'>{username}</div>

                </div>
                <div className=' text-black flex justify-between rounded-2xl '>
                    <div className='text-sm ml-2 text-white'>group members  {
                        (groups[id]?.members?.length) > 0 ? <span>{groups[id]?.members?.length}</span> : <span>0</span>
                    }</div>

                </div>
            </div>
        </div>
    )

}

export default GroupBox
