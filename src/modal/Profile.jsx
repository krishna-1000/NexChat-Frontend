import React, { useEffect, useState } from 'react'
import { CiAlarmOn, CiLock, CiStar, CiTimer } from 'react-icons/ci'
import { FaCalendar, FaRegUser } from 'react-icons/fa6'
import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from 'react-redux';
import useUser from '../hooks/useUser';
import { toast } from 'react-toastify';
import Avatar from '../components/main/Avatar';


const Profile = () => {
    const tempUsername = localStorage.getItem("username");

    const [username, setUsername] = useState(tempUsername)
    const [editMode, setEditMode] = useState(false)
    const [bio, setBio] = useState("")
    const loginUserId = localStorage.getItem("loginUserId");
    const loginUserName = localStorage.getItem("loginUserName");
    const userBio = localStorage.getItem("userBio");
    const userEmail = localStorage.getItem("userEmail");
    const UserMemberSince = localStorage.getItem("UserMemberSince");
    const [currentTime, setCurrentTime] = useState(null);


    useEffect(() => {
        const currentTime = new Date().toString().substring(15, 24);
        setCurrentTime(currentTime)

    }, [])


    return (
        <div className=' h-130 p-2 w-full flex flex-col '>
            <header className=' h-50 w-full flex flex-col justify-center items-center'>
                <div className='h-25  flex justify-center items-center'>
                    <Avatar username={loginUserName}/>
                </div>
                <p className='flex flex-col h-12  gap-1'>

                    <span className='text-center font-extrabold'>{loginUserName}</span>
                    <span className='self-center text-xs text-center flex justify-center items-center underline w-70  text-wrap'>{userEmail}</span>


                </p>
             

            </header>
            <main className=' flex-1 mt-1'>
                <div className='flex flex-col gap-1'>
                    <div className=' h-15 flex border-b border-gray-500 '>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <FaRegUser size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>username</span>
                            {
                                editMode ? <input className='bg-gray-600 rounded-2xl w-full h-7' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                                    : <span>@{loginUserName}</span>
                            }

                        </div>
                    </div>
                    <div className=' h-15 flex border-b border-gray-500'>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <MdOutlineEmail size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>Email</span>
                            <p className='text-wrap w-70 overflow-auto'>{userEmail}</p>

                        </div>
                    </div>
                    <div className='h-15 flex border-b border-gray-500 '>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <FaCalendar size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>Member Since</span>
                            <span>{UserMemberSince.substring(0, 10)}</span>
                        </div>
                    </div>
                    <div className=' h-15 flex border-b border-gray-500'>
                        <div className='ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <CiTimer size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>LocalTime</span>
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </div>

            </main>
            {/* <footer onClick={() => } className={`${(editMode) ? 'bg-green-500 ' : 'bg-blue-600 '}   hover:cursor-pointer  h-9 gap-0.5 flex justify-center items-center font-bold rounded-2xl`}>
                <div>
                    <CiStar />
                    <button >close</button>
                </div>



            </footer> */}

        </div>
    )
}

export default Profile
