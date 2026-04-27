import React from 'react'
import { FaBars } from "react-icons/fa";
import { MdCall, MdMenu } from "react-icons/md";
import { IoIosVideocam } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";


import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setType } from '../../features/modal/modalSlice'
import { CiAlarmOn } from 'react-icons/ci';
import Avatar from './Avatar';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.chat.selectedUserName);
    const handleJoineCall = async () => {

        dispatch(setType("video-call"))
        dispatch(setIsModalOpen(true))

    }
    const handleVoiceCall = () => {
        dispatch(setType("voice-call"))
        dispatch(setIsModalOpen(true))
    }

    return (
        <div className='flex w-full justify-between h-15 bg-gray-900 text-white'>
            <div className='flex gap-2 min-h-full items-center w-45 '>

                <div onClick={() => setIsSidebarOpen(true)} className={isSidebarOpen ? "hidden" : "p-2 mr-2 block hover:bg-gray-800 rounded-lg"}><MdMenu size={25} color='white' /></div>
                <div className='flex justify-center items-center bg-cyan-700 rounded-2xl h-13 w-13'>
                    <Avatar username={selectedUser} />
                </div>
                <div className='flex flex-col  mt-2 '>
                    <label className='text-xl font-bold '>{selectedUser}</label>
                    
                </div>
            </div>
            <div className='flex gap-3 justify-center items-center'>
                <div className='cursor-pointer' onClick={() => handleJoineCall()}><IoIosVideocam />
                </div>
                <div onClick={() => handleVoiceCall()}><MdCall /></div>
                

            </div>
        </div>
    )
}

export default Navbar
