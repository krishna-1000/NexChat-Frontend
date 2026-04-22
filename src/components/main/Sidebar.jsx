import React, { useState } from 'react'
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiAlarmOn, CiSearch, CiSettings } from "react-icons/ci";
import UserBox from './UserBox';
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp } from '../../websocket/websocket';
import CreateGroup from '../group/CreateGroup';
import { setData, setIsModalOpen, setType } from '../../features/modal/modalSlice';
import GroupBox from './GroupBox';
import { useNavigate } from 'react-router-dom';
import { MdClose, MdMenu } from 'react-icons/md';
import { GiCrossMark } from 'react-icons/gi';




const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [inputData, setInputData] = useState("");
    const { groups } = useSelector((state) => state.group);
    const [searchName, setSearchName] = useState("");
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const currentLoginUserId = localStorage.getItem("loginUserId")
    const navigate = useNavigate();
    const loginUserName = localStorage.getItem("loginUserName");
    const userBio = localStorage.getItem("userBio");




    return (
        //outerMost 
        <div className={isSidebarOpen ? 'bg-gray-900 w-full text-white min-h-screen flex flex-col justify-center border-r border-cyan-900 rounded-md' : 'hidden'}>
            <header className=' flex justify-between border-r border-cyan-900  h-15 bg-gray-900  pl-3 items-center'>
                <div onClick={() => connectToStomp()} className='flex gap-2 items-center justify-center font-extrabold'>
                    <FaRegMessage size={25} /> <span><span className='text-cyan-300 text-2xl'>Nex</span>Chat</span>
                </div>

                <div onClick={() => setIsSidebarOpen(false)} className={isSidebarOpen ? 'visible mr-4 ' : 'hidden'}><GiCrossMark  size={25} color='white' /></div>


            </header>
            {/* seach bar */}
            <div className='bg-gray-800 h-8 flex justify-center items-center ml-3  rounded-2xl '>
                {/* bg-transparent text-cyan-100 text-xs font-mono placeholder-gray-600 w-full outline-none */}
                <input placeholder='search name here....' className='text-cyan-100 text-sx font-mono placeholder-gray-600 outline-none bg-transparent rounded-sm w-full h-full' type='text' name='searchbar' value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
                <div className='bg-transparent rounded-2xl'>
                    <CiSearch size={30} />
                </div>
            </div>
            <main className='bg-gray-900 mt-2 h-full'>
                {/* chanel */}
                <div className='border-t border-gray-500 '>
                    <div className='bg-transparent flex border-b border-gray-500 justify-between pl-3 items-center'>
                        <span className='font-extralight '>Groups</span>
                        <button onClick={() => {
                            dispatch(setType("create-group"))
                            dispatch(setIsModalOpen(true))
                        }} className='bg-transparent pr-5 text-xl font-extrabold text-white'>+</button>
                    </div>
                    <div className='ml-3 flex flex-col overflow-y-scroll gap-2 h-40 bg-transparent'>
                        {
                            groups && groups.filter((group, index) => {
                                return group.groupName.includes(searchName.toLowerCase())
                            }).map((group) => (
                                <div key={group.groupId}>
                                    <GroupBox id={group.groupId} username={group.groupName} />
                                </div>
                            ))
                        }
                        {!groups ? <div>No group available</div> : null}

                    </div>
                </div>
                {/* direct messages */}
                <div className='border-t border-gray-500'>
                    <div className='bg-transparent border-b border-gray-500 flex justify-start pl-3 mt-2'>
                        <span className='font-extralight'> Direct message</span>
                    </div>
                    <div className='flex flex-col gap-2 ml-3 overflow-y-scroll h-60 bg-transparent '>
                        {
                            users && users.filter((user, index) => {
                                return user.username.includes(searchName)
                            }).map((user) => {
                                if (user.id == currentLoginUserId) {
                                    return null;
                                }
                                return (<div key={user.id}>
                                    <UserBox userBio = {userBio} id={user.id} username={user.username} />
                                </div>)
                            }


                            )
                        }

                        {!users ? <div>No user available</div> : null}
                    </div>
                </div>

            </main>
            <footer className=' flex-1 flex items-center bg-gray-950 rounded-2xl mr-3 ml-3'>
                <div onClick={() => {
                    dispatch(setIsModalOpen(true))
                    dispatch(setType("Profile"))
                }} className='  w-full pr-2 flex justify-start items-center gap-1 h-15 rounded-2xl hover:bg-gray-800'>

                    <div className='flex justify-center items-center bg-yellow-400 h-9 w-10 rounded-2xl border-black'>
                        <CiAlarmOn className='text-white ' size={30} />
                    </div>
                    <div className=' rounded-2xl  w-full cursor-pointer flex justify-between '>
                        <div className='flex flex-col justify-center ml-2'>
                            <div className='font-mono text-cyan-100'>{loginUserName}</div>
                            <div className='text-sm  text-white'>{userBio}</div>
                        </div>

                    </div>
                </div>
                <div onClick={() => navigate("/logout")} className='hover:scale-110 hover:bg-gray-800 flex justify-center items-center mr-5'>
                    <CiSettings size={20} color='white' />
                </div>

            </footer>

        </div>
    )
}

export default Sidebar

