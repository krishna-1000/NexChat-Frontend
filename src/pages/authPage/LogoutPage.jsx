import React from 'react'
import { stopConnection } from '../../websocket/websocket';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-900 h-screen w-screen flex justify-center items-center'>
            <button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("loginUser");
                localStorage.removeItem("loginUserId");
                stopConnection();
                navigate("/login")

            }} className='bg-red-400 w-40 h-10 rounded-4xl font-extrabold text-center hover:scale-125'>Logout</button>
        </div>
    )
}

export default LogoutPage
