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

const ChatPage = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const selectedUser = useSelector((state) => state.chat.selectedUserId);
  const selectedGroup = useSelector((state) => state.group.selectedGroup);
  const { getUsers, getGroups } = useUser();
  const loginUserId = localStorage.getItem("loginUserId");
  useEffect(() => {
    getUsers();
    getGroups(loginUserId);

  }, [])


  
  // if (error) {
  //   console.log(error)
  //   return (<div>{error}</div>)
  // }

  return (

    <div className='bg-gray-900 flex justify-start items-start h-screen'>
      <SocketEventListener />

      <div className='w-85  h-full'>
        <Sidebar />
      </div>
      {selectedUser || selectedGroup ?
        <div className=' text-white flex flex-col h-full flex-1'>

          <div className='w-full h-15'>
            {selectedGroup ?
              <GroupNavbar />
              : <Navbar />
            }
          </div>
          <div className='w-full flex-1 bg-gray-900 overflow-hidden'>
            <ChatWindow />
          </div>
        </div> :
        <div className='text-white flex justify-center items-center h-full  w-full font-extralight text-2xl'>Select a user to chat</div>
      }

    </div>
  )
}

export default ChatPage
