import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import Navbar from '../../components/main/Navbar'
import useUser from '../../hooks/useUser'
import ChatWindow from '../../components/main/ChatWindow'
import { useSelector } from 'react-redux'
import ChatNavbar from '../../components/main/ChatNavbar'

const ChatPage = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const selectedUser = useSelector((state)=>state.chat.selectedUser);
  const { getUsers } = useUser();
  useEffect(() => {
    getUsers();

  }, [])
  

  if (loading) {
    return (<div>Loading....</div>)
  }
  // if (error) {
  //   console.log(error)
  //   return (<div>{error}</div>)
  // }
  
  return (
    <div className='bg-gray-900 flex'>

      <Sidebar />

      {selectedUser ?
        <div className='bg-blue-900 text-white flex-col w-full h-screen'>
          <ChatNavbar />
          <ChatWindow />
        </div>:<div className='text-white flex justify-center items-center  w-full'>NOTHING TO SHOW</div>
      }
    </div>
  )
}

export default ChatPage
