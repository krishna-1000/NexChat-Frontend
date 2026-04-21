import React, { useEffect, useState } from 'react'
import Message from './SendMessage'
import SendMessage from './SendMessage';
import RecieveMessage from './RecieveMessage';
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp, sendMessage, subscribeToRoom, unsubscribeFromRoom } from '../../websocket/websocket';
import { appendMessage, setChatMessages } from '../../features/chat/chatSlice';
import { MdAttachFile, MdSend } from 'react-icons/md';
import { FaMicrophone, FaSpinner } from 'react-icons/fa6';

const ChatWindow = () => {
    const {  loading } = useSelector((state) => state.user);
  
  const [inputData, setInputData] = useState("");
  const receiverId = useSelector((state) => state.chat.selectedUserId);
  const groupId = useSelector((state) => state.group.selectedGroup);
  const allMessages = useSelector((state) => state.chat.chatMessages);
  const allroomId = useSelector((state) => state.chat.chatRoomsId);

  const currentChatRoomId =receiverId?allroomId[receiverId]:allroomId[groupId]
  const currentRoomMessages = allMessages[currentChatRoomId] || [];
  const dispatch = useDispatch();
  const currentUserId = localStorage.getItem("loginUserId");


  useEffect(() => {

    connectToStomp(() => {
      if (currentChatRoomId) {
        subscribeToRoom(currentChatRoomId, (recievedMsg) => {
          dispatch(appendMessage({ roomId: currentChatRoomId, message: recievedMsg }));
        });
      }
    })

    return () => {
      if (currentChatRoomId) unsubscribeFromRoom(currentChatRoomId);
    };
  }, [currentChatRoomId, dispatch])

  const handleOnClickSend = () => {
    if (inputData.length == "") {
      return;
    }
    const messageObj = { content: inputData, chatRoomId: currentChatRoomId };
    sendMessage(messageObj);
    setInputData("");

  }

  if (currentRoomMessages === undefined || !currentRoomMessages || currentRoomMessages == []) {
    return (<div className='bg-gray-900 flex justify-center items-center text-4xl w-full h-full'>No user selected !</div>)
  }

  if (loading) {
    return (<div className='bg-gray-900 h-screen w-full flex justify-center items-center'><FaSpinner color='green' size={60}/></div>)
  }

  return (
    <div className=' h-full text-white text-lg flex flex-col border-t  border-gray-500'>
      <div className=' h-full flex-col overflow-auto border-b border-gray-500 mt-1' >

        {
          currentRoomMessages.map((item, index) =>
            item ?
              <li className={item.senderId == currentUserId ? 'flex justify-end mb-3' : 'mb-3'} key={index}>
                {
                  item.senderId == currentUserId ?
                    <SendMessage username={item.senderName} message={item.content} />
                    : <RecieveMessage username={item.senderName} message={item.content} />
                }
              </li> : null
          )

        }

      </div>
      <div className=' text-center h-15  mb-1 rounded-2xl flex  items-center'>

        <div className='w-10 flex justify-center h-full items-center '>
          <MdAttachFile size={30} className='bg-gray-600 rounded-3xl p-1 cursor-pointer hover:scale-110' />
        </div>
        <div className='w-full h-10 rounded-2xl '>

          <input placeholder='type message here...' className='text-cyan-100 bg-gray-700 text-sx font-mono placeholder-gray-400 outline-none  rounded-2xl w-full h-full' value={inputData} onChange={(e) => setInputData(e.target.value)} type='text' name='sendbox'></input>
        </div>
        <div className='flex w-30 justify-start ml-1 gap-2 '>
          <button className='bg-gray-600 rounded-3xl p-2 cursor-pointer hover:scale-110'><FaMicrophone size={20} /></button>
          <button onClick={() => handleOnClickSend()} className='p-2  bg-gray-600 rounded-3xl cursor-pointer hover:scale-110 text-white '><MdSend size={25} /></button>

        </div>

      </div>
    </div>
  )
}

export default ChatWindow
