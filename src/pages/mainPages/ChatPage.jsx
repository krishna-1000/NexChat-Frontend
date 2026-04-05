import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/main/Sidebar'
import Navbar from '../../components/main/Navbar'
import { getUserList } from '../../api/user/userApi'

const ChatPage = () => {
  const [sidebar, setSidebar] = useState(false);
  const [userlist,setUserList] = useState([]);

  useEffect( ()=>{
      const fetchData = async ()=>{
        const response = getUserList();
        console.log(response.data);
        setUserList((await response).data);
      }
      fetchData();
    
  },[])
  console.log(userlist);
  return (
    <div className='bg-gray-900 flex'>
      {
        sidebar ? <Sidebar userlist={userlist} setSidebar={setSidebar} /> : null
      }
      <Navbar setSidebar={setSidebar}/>

    </div>
  )
}

export default ChatPage
