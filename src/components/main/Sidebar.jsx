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




const Sidebar = () => {
    const [inputData, setInputData] = useState("");
    const { groups } = useSelector((state) => state.group);
    const [searchName, setSearchName] = useState("");
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const currentLoginUserId = localStorage.getItem("loginUserId");




    return (
        //outerMost 
        <div className='bg-gray-900 w-85 text-white min-h-screen flex flex-col justify-center border-r border-cyan-900 rounded-md'>
            <header className='border-r border-cyan-900  h-15 bg-gray-900 flex justify-start pl-3 items-center'>
                <div onClick={() => connectToStomp()} className='flex gap-2 items-center justify-center font-extrabold'>
                    <FaRegMessage size={25} /> <span><span className='text-cyan-300 text-2xl'>Nex</span>Chat</span>
                </div>


            </header>
            {/* seach bar */}
            <div className='bg-gray-800 h-8 flex justify-center items-center ml-3  rounded-2xl '>
                {/* bg-transparent text-cyan-100 text-xs font-mono placeholder-gray-600 w-full outline-none */}
                <input placeholder='search name here....'  className='text-cyan-100 text-sx font-mono placeholder-gray-600 outline-none bg-transparent rounded-sm w-full h-full' type='text' name='searchbar' value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
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
                {!groups?<div>No group available</div>:null}

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
                                    <UserBox id={user.id} username={user.username} />
                                </div>)
                            }


                            )
                        }

                        {!users?<div>No user available</div>:null}
                    </div>
                </div>

            </main>
            <footer className=' flex-1 flex items-center bg-gray-950 '>
                 <div  onClick={()=>{
                                    dispatch(setIsModalOpen(true))
                                    dispatch(setType("Profile"))
                                }} className='  w-full pr-2 flex justify-start items-center gap-1 h-15 rounded-2xl hover:bg-gray-800'>
                           
                            <div className='flex justify-center items-center bg-yellow-400 h-9 w-10 rounded-2xl border-black'>
                                <CiAlarmOn  className='text-white ' size={30} />
                            </div>
                            <div className=' rounded-2xl  w-full cursor-pointer flex justify-between '>
                               <div className='flex flex-col justify-center ml-2'>
                                <div  className='font-mono text-cyan-100'>krishna</div>
                                <div className='text-sm  text-white'>this is my note for cha.</div>
                                </div>
                                
                            </div>
                    </div>
                    <div className='flex justify-center items-center mr-5'>
                                    <CiSettings size={20}/>
                    </div>
                               
            </footer>

        </div>
    )
}

export default Sidebar


// return (
//     <div className='bg-gray-900 w-64 text-white min-h-screen flex flex-col border-r border-cyan-900'>
        
//         {/* Header */}
//         <header className='h-14 bg-gray-900 border-b border-cyan-900 flex justify-between items-center px-4'>
//             <div onClick={() => connectToStomp()} className='flex items-center gap-2 cursor-pointer'>
//                 <div className='w-8 h-8 rounded-full bg-cyan-950 border-2 border-cyan-500 flex items-center justify-center'>
//                     <FaRegMessage className='text-cyan-400 text-sm' />
//                 </div>
//                 <span className='text-white font-bold tracking-widest uppercase text-sm'>
//                     Nex<span className='text-cyan-400'>Chat</span>
//                 </span>
//             </div>
//         </header>

//         {/* Search Bar */}
//         <div className='px-3 py-3'>
//             <div className='flex items-center bg-gray-800 border border-gray-700 rounded-xl px-3 h-9 gap-2 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-all duration-200'>
//                 <CiSearch className='text-cyan-800 size-4 shrink-0' />
//                 <input
//                     type='text'
//                     name='searchbar'
//                     value={searchName}
//                     onChange={(e) => setSearchName(e.target.value)}
//                     placeholder='search_chats...'
//                     className='bg-transparent text-cyan-100 text-xs font-mono placeholder-gray-600 w-full outline-none'
//                 />
//             </div>
//         </div>

//         {/* Main scrollable area */}
//         <main className='flex flex-col flex-1 overflow-hidden px-2'>

//             {/* Groups Section */}
//             <div className='mb-2'>
//                 <div className='flex justify-between items-center px-2 py-2'>
//                     <span className='text-xs font-mono tracking-widest uppercase text-cyan-900'>Groups</span>
//                     <button
//                         onClick={() => {
//                             dispatch(setType("create-group"))
//                             dispatch(setIsModalOpen(true))
//                         }}
//                         className='w-5 h-5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-sm flex items-center justify-center transition-colors duration-200'
//                     >
//                         +
//                     </button>
//                 </div>
//                 <div className='flex flex-col overflow-y-scroll h-40 scrollbar-none'>
//                     {groups && groups.filter((group) =>
//                         group.groupName.includes(searchName.toLowerCase())
//                     ).map((group) => (
//                         <div key={group.groupId}>
//                             <GroupBox id={group.groupId} username={group.groupName} />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Divider */}
//             <div className='h-px bg-gray-800 mx-2 mb-2' />

//             {/* Direct Messages Section */}
//             <div className='flex flex-col flex-1 overflow-hidden'>
//                 <div className='flex items-center px-2 py-2'>
//                     <span className='text-xs font-mono tracking-widest uppercase text-cyan-900'># channel</span>
//                 </div>
//                 <div className='flex flex-col overflow-y-scroll flex-1 scrollbar-none'>
//                     {users && users.filter((user) =>
//                         user.username.includes(searchName)
//                     ).map((user) => {
//                         if (user.id == currentLoginUserId) return null;
//                         return (
//                             <div key={user.id}>
//                                 <UserBox id={user.id} username={user.username} />
//                             </div>
//                         )
//                     })}
//                     <UserBox username={"xyz"} />
//                 </div>
//             </div>

//         </main>

//         {/* Footer */}
//         <footer className='h-14 bg-gray-900 border-t border-gray-800 flex items-center px-4 gap-3'>
//             <div className='w-8 h-8 rounded-full bg-cyan-950 border-2 border-cyan-500 flex items-center justify-center text-xs font-mono font-bold text-cyan-400'>
//                 ME
//             </div>
//             <div className='flex flex-col flex-1'>
//                 <span className='text-xs font-semibold text-gray-200'>you</span>
//                 <span className='text-xs font-mono text-cyan-900 tracking-wider flex items-center gap-1'>
//                     <span className='w-1.5 h-1.5 rounded-full bg-green-500 inline-block'></span>
//                     online
//                 </span>
//             </div>
//         </footer>

//     </div>
// )