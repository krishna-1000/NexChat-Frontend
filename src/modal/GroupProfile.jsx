import React, { useEffect, useState } from 'react'
import { CiAlarmOn, CiLock, CiStar, CiTimer } from 'react-icons/ci'
import { FaCalendar, FaRegUser } from 'react-icons/fa6'
import { MdDelete, MdMessage, MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../features/modal/modalSlice';


const GroupProfile = () => {
    const [editMode, setEditMode] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("krishan")
    const [bio, setBio] = useState("")
    const { groups, groupId, selectedGroup, groupName } = useSelector((state) => state.group);
    const { chatMessages } = useSelector((state) => state.chat);
    const loginUserName = localStorage.getItem("loginUserName")
    const [memberCount, setMembersCount] = useState(3);
    const dispatch = useDispatch();

    return (
        <div className=' h-130 p-2 w-full md:w-100 flex flex-col '>
            <header className=' h-50 w-full flex flex-col '>
                <div className='h-25  flex justify-center items-center'>
                    <div className='bg-blue-600 rounded-4xl'>
                        <CiAlarmOn size={90} />
                    </div>
                </div>
                <p className='flex flex-col h-12  gap-1'>
                    {
                        editMode ? <input className='bg-gray-600 rounded-2xl w-full h-7' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                            : <span className='text-center font-extrabold'>{groupName}</span>
                    }

                </p>
                <div className=' flex justify-evenly h-12 w-full m-1'>
                    <div className='bg-black flex flex-col rounded-2xl justify-center items-center p-1'>
                        <span className='font-extralight'>Members</span> {groups[selectedGroup]?.members?.length}
                    </div>
                    <div className='bg-black flex flex-col rounded-2xl justify-center items-center p-1'>
                        <span className='font-extralight'>Messages</span> {chatMessages[selectedGroup] && Object.keys(chatMessages[selectedGroup])?.length}
                    </div>

                </div>

            </header>
            <main className=' h-70 mt-1 '>
                <div className='overflow-auto h-50'>

                    {
                        groups && groups.map((group) => {
                            console.log(groupId, selectedGroup)
                            if (group.groupId != selectedGroup) { return null }
                            return (group.members.map((member, index) => {

                                if (member.user.username == group.createdBy) {
                                    return <li className=' h-5 flex justify-start items-center hover:bg-gray-700 rounded-md text-white bg-green-400 w-fit' key={member.user.id}>
                                        <span>Admin {member.user.username}</span>
                                    </li>
                                }
                                return <li className='border-b-4 border-gray-700 h-10 flex justify-between items-center hover:bg-gray-700 rounded-md' key={member.user.id}>
                                    <span className='font-light text-2xl'> {member.user.username}</span>


                                </li>


                            }))
                        })

                    }
                </div>

            </main>

            <footer onClick={()=>dispatch(setIsModalOpen(false))} className='hover:cursor-pointer bg-purple-500  h-9 gap-0.5 flex justify-center items-center font-bold rounded-2xl'>

                <div className='flex justify-center items-center gap-1'>
                    <MdMessage size={25} />
                    <button >Send Message</button>
                </div>



            </footer>


        </div>
    )
}

export default GroupProfile
