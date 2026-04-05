import React, { useState } from 'react'
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import UserBox from './UserBox';



const Sidebar = ({userlist,setSidebar}) => {
    const [inputData,setInputData] = useState("");
    const [channels,setChannels] = useState([]);
    const [users,setUsers] = useState([]);
    return (
        //outerMost 
        <div className='bg-gray-900 w-xs text-white min-h-screen flex-col justify-center items-center rounded-2xl'>
            <header className='border-red-300 w-full h-13 bg-pink-500 flex justify-between items-center'>
                <div className='flex'>
                    <FaRegMessage/> <span>NexChat</span>
                </div>
                <div onClick={()=>setSidebar(false)}>
                    <IoMdClose></IoMdClose>
                </div>

            </header>
            {/* seach bar */}
            <div className='bg-red-500 flex justify-center items-center pl-4 relative rounded-2xl h-8'>
            <input type='text' name='searchbar' value={inputData} onChange={(e)=>setInputData(e.target.value)} className='text-black bg-white w-full h-fit'></input>
            <div className='w-20 bg-black rounded-2xl'>
                <CiSearch className='size-5'/>
            </div>
            </div>
            <main className='bg-green-500  h-125'>
                {/* chanel */}
                <div className='ml-3'>
                    <div className='bg-cyan-500 flex justify-start items-center'> #channel</div>
                    <div className='flex-col overflow-y-scroll h-40 bg-yellow-500'>
                        {
                            channels.map((channel,index)=>(
                                <UserBox id={channel.id}/>
                            ))
                        }
                        
                 
                    </div>
                </div>
                {/* direct messages */}
                 <div className='ml-3'>
                    <div className='bg-cyan-500 flex justify-start items-center'> #channel</div>
                    <div className='flex-col overflow-y-scroll h-73 bg-blue-500'>
                        {
                            userlist.map((user,index)=>(
                                <UserBox id={user.id} username={user.username}/>
                            ))
                        }
                    
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
