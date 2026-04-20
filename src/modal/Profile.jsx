import React from 'react'
import { CiAlarmOn, CiLock, CiStar, CiTimer } from 'react-icons/ci'
import { FaCalendar, FaRegUser } from 'react-icons/fa6'
import { MdOutlineEmail } from "react-icons/md";


const Profile = () => {
    const LoginUser = localStorage.getItem("loginUserName");
    return (
        <div className=' h-130 p-2 w-full flex flex-col '>
            <header className=' h-50 w-full flex flex-col'>
                <div className='h-25  flex justify-center items-center'>
                    <div className='bg-blue-600 rounded-4xl'>
                        <CiAlarmOn size={90} />
                        </div>
                </div>
                <p className='flex flex-col h-12'>
                    <span className='text-center font-extrabold'>sklfjs</span>
                    <span className='text-xs text-center underline'>hay there i am busy right now</span>
                </p>
                <div className=' flex justify-evenly h-12 w-full m-1'>
                    <div className='bg-black flex flex-col rounded-2xl justify-center items-center p-1'>
                        <span>1.2k</span> message
                    </div>
                    <div className='bg-black flex flex-col rounded-2xl justify-center items-center p-1'>
                        <span>1.2k</span> message
                    </div>
                    <div className='bg-black flex flex-col rounded-2xl justify-center items-center p-1'>
                        <span>1.2k</span> message
                    </div>
                </div>

            </header>
            <main className=' h-70 mt-1'>
                <div className='flex flex-col gap-1'>
                    <div className=' h-15 flex border-b border-gray-500 '>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <FaRegUser size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>username</span>
                            <span>@Krishnapal</span>
                        </div>
                    </div>
                   <div className=' h-15 flex border-b border-gray-500'>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <MdOutlineEmail size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>Email</span>
                            <span>Krishnapalpatidar@17gmai.com</span>
                        </div>
                    </div>
                   <div className='h-15 flex border-b border-gray-500 '>
                        <div className=' ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <FaCalendar size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>Member Since</span>
                            <span>2025 march</span>
                        </div>
                    </div>
                    <div className=' h-15 flex border-b border-gray-500'>
                        <div className='ml-1 flex h-7 w-7 self-center justify-center items-center rounded-2xl'>
                            <CiTimer size={15} />
                        </div>
                        <div className='flex-col flex ml-1 '>
                            <span className='text-sm'>LocalTime</span>
                            <span>12:30 pm</span>
                        </div>
                    </div>
                </div>

            </main>
            <footer className='hover:cursor-pointer bg-blue-600 h-9 gap-0.5 flex justify-center items-center font-bold rounded-2xl'>
                <CiStar/>
                <button >Edit profile</button>

            </footer>

        </div>
    )
}

export default Profile
