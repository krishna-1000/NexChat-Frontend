import React from 'react'
import { FaBars } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { webRTC } from '../../service/VoiceChatService/webRTC';

const handleJoineCall = ()=>{
    webRTC();
}
const Navbar = () => {
    // const selectedUserId = useSelector((state) => state.chat.selectedUserId);
    // let user = useSelector(state => state.user.users.find((u) => u.id == selectedUserId));
    return (
        <div className='flex w-full justify-between h-15 bg-red-900 text-white'>
            <div className='flex min-h-full bg-red-500'>
                <div className='flex gap-4 justify-center'>

                    {/* <label>{user.username}</label>
                    <label>{user.email}</label> */}
                </div>
            </div>
            <div className='flex gap-3'>
                <div className='cursor-pointer' onClick={()=>handleJoineCall()}>vo</div>
                <div>vi</div>
                <div>dot</div>

            </div>
        </div>
    )
}

export default Navbar
