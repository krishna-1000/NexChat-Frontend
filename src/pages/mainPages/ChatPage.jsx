import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import Navbar from '../../components/main/Navbar'
import useUser from '../../hooks/useUser'
import ChatWindow from '../../components/main/ChatWindow'
import { useSelector } from 'react-redux'
import { connectToStomp } from '../../websocket/websocket'
import SocketEventListener from '../../components/main/websocket/SocketEventListener'
import GroupNavbar from '../../components/main/GroupNavbar'
import { FaSpinner } from 'react-icons/fa6'
import { MdMenu } from 'react-icons/md'

const ChatPage = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const selectedUser = useSelector((state) => state.chat.selectedUserId);
  const selectedGroup = useSelector((state) => state.group.selectedGroup);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { getUsers, getGroups } = useUser();
  const loginUserId = localStorage.getItem("loginUserId")
  useEffect(() => {
    getUsers();

    getGroups(loginUserId);

  }, [])



  // if (error) {
  //   console.log(error)
  //   return (<div>{error}</div>)
  // }

  return (
    <div className='bg-gray-900 flex justify-start items-start w-full h-screen overflow-hidden'>
      <SocketEventListener />


      <div className={`
        ${(isSidebarOpen) ? 'block  ' : 'hidden'} 
         md:w-85  bg-red-900 w-full md:h-full  border-r border-gray-800
      `}>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {selectedUser || selectedGroup ? (
        <div className='text-white flex flex-col h-full flex-1 '>

          <div className='w-full h-15'>
            {selectedGroup ?
              <GroupNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
              : <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            }
          </div>

          <div className='w-full  flex-1 bg-gray-900 overflow-hidden'>
            <ChatWindow />
          </div>

        </div>
      ) : (

        
        <div className='flex text-white justify-start items-start h-full flex-1 font-extralight text-2xl'>
          <div className={isSidebarOpen?'hidden':'flex'} onClick={()=>setIsSidebarOpen(true)}><MdMenu size={30} color='white'/></div>
          Select a user to chat
        </div>
      )}
    </div>
  );
}

export default ChatPage
