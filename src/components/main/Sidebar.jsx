import React, { useState } from 'react'
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import UserBox from './UserBox';
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp } from '../../websocket/websocket';
import CreateGroup from '../group/CreateGroup';
import { setData, setIsModalOpen, setType } from '../../features/modal/modalSlice';
import GroupBox from './GroupBox';




const Sidebar = () => {
    const [inputData, setInputData] = useState("");
    const { groups } = useSelector((state) => state.group);
    const [searchName, setSearchName] = useState("");
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const currentLoginUserId = localStorage.getItem("loginUserId");




    return (
        //outerMost 
        <div className='bg-gray-900 w-xs text-white min-h-screen flex-col justify-center items-center rounded-2xl'>
            <header className='border-red-300 w-full h-13 bg-pink-500 flex justify-between items-center'>
                <div onClick={() => connectToStomp()} className='flex'>
                    <FaRegMessage /> <span>NexChat</span>
                </div>


            </header>
            {/* seach bar */}
            <div className='bg-red-500 flex justify-center items-center pl-4 relative rounded-2xl h-8'>
                <input type='text' name='searchbar' value={searchName} onChange={(e) => setSearchName(e.target.value)} className='text-black bg-white w-full h-fit'></input>
                <div className='w-20 bg-black rounded-2xl'>
                    <CiSearch className='size-5' />
                </div>
            </div>
            <main className='bg-green-500  h-125'>
                {/* chanel */}
                <div className='ml-3'>
                    <div className='bg-cyan-500 flex justify-evenly items-center'>
                        <span>Groups</span>
                        <button onClick={() => {
                            dispatch(setType("create-group"))
                            dispatch(setIsModalOpen(true))
                        }} className='bg-black text-lg text-white'>+</button>
                    </div>
                    <div className='flex-col overflow-y-scroll h-40 bg-yellow-500'>
                        {
                            groups && groups.filter((group, index) => {
                                return group.groupName.includes(searchName.toLowerCase())
                            }).map((group) => (
                                <div key={group.groupId}>
                                    <GroupBox id={group.groupId} username={group.groupName} />
                                </div>
                            ))
                        }


                    </div>
                </div>
                {/* direct messages */}
                <div className='ml-3'>
                    <div className='bg-cyan-500 flex justify-start items-center'> #channel</div>
                    <div className='flex-col overflow-y-scroll h-73 bg-blue-500'>
                        {
                            users && users.filter((user, index) => {
                                return user.username.includes(searchName)
                            }).map((user) => {
                                if (user.id == currentLoginUserId) {
                                    return null;
                                }
                                return (<div key={user.id}>
                                    <UserBox id={user.id} username={user.username} />
                                </div>)
                            }


                            )
                        }

                        <UserBox username={"xyz"} />
                    </div>
                </div>

            </main>
            <footer className='bg-black-200 h-12 z-10 ml-3'>
                THIS IS TEMP FOOTER
            </footer>

        </div>
    )
}

export default Sidebar
