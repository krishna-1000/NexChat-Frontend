import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import Navbar from '../../components/main/Navbar'
import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'

const ChatPage = () => {
  const [sidebar, setSidebar] = useState(false);
  const { users, loading, error } = useSelector((state) => state.user);
  const { getUsers } = useUser();
  useEffect(() => {
    getUsers();

  }, [])

  if (loading) {
    return (<div>Loading....</div>)
  }
  if (error) {
    console.log(error)
    return (<div>{error}</div>)
  }
  return (
    <div className='bg-gray-900 flex'>
      {
        sidebar ? <Sidebar setSidebar={setSidebar} /> : null
      }
      <Navbar setSidebar={setSidebar} />

    </div>
  )
}

export default ChatPage
