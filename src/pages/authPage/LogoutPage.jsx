import React from 'react'
import { stopConnection } from '../../websocket/websocket';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProfileData } from '../../features/user/profileSlice';
import useUser from '../../hooks/useUser';

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deleteAccount } = useUser();
    const currentUserId = localStorage.getItem("loginUserId");

    const handleDeleteAccount = async () => {
        // const res = await deleteAccount(currentUserId)
        // if (res) {
        //    // dispatch(deleteProfileData());
        //     // stopConnection();
        //     // localStorage.removeItem("token");
        //     // console.log(res)
        // }

         navigate("/login")
    }
    return (

        <div>
            <button onClick={() => navigate("/chat")}>back</button>
            <div className='bg-gray-900 h-screen w-screen flex flex-col min-h-screen justify-center gap-3 items-center'>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    stopConnection();
                    dispatch(deleteProfileData());
                    navigate("/login")

                }} className='bg-red-400 md:w-40 w-full h-10 rounded-4xl font-extrabold text-center hover:scale-125'>Logout</button>
                <button onClick={() => {
                    const res = confirm("do you want to delete account?");
                    if (res) {
                        const res = confirm("confirm again!")
                        if (res) {
                            handleDeleteAccount();
                        }
                    }

                }} className='bg-red-400 md:w-40 w-full h-10 rounded-4xl font-extrabold text-center hover:scale-125'>Delete Account</button>

            </div>

        </div>
    )
}

export default LogoutPage
