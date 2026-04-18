import React, { useEffect, useState } from 'react'
import Message from './SendMessage'
import SendMessage from './SendMessage';
import RecieveMessage from './RecieveMessage';
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp, sendMessage, subscribeToRoom, unsubscribeFromRoom } from '../../websocket/websocket';
import { appendMessage, setChatMessages } from '../../features/chat/chatSlice';

const ChatWindow = () => {
  const [inputData, setInputData] = useState("");
  const receiverId = useSelector((state) => state.chat.selectedUserId);
  const allMessages = useSelector((state) => state.chat.chatMessages);
  const roomId = useSelector((state) => state.chat.chatRoomId);
  const currentRoomMessages = allMessages[roomId] || [];
  const dispatch = useDispatch();
  const currentUserId = localStorage.getItem("loginUserId");


  useEffect(() => {
    connectToStomp(() => {
      if (roomId) {
        subscribeToRoom(roomId, (recievedMsg) => {
          dispatch(appendMessage({ roomId: roomId, message: recievedMsg }));
        });
      }
    })

    return () => {
      if (roomId) unsubscribeFromRoom(roomId);
    };
  }, [roomId, dispatch])

  const handleOnClickSend = () => {
    if (inputData.length == "") {
      return;
    }
    const messageObj = { content: inputData, chatRoomId: roomId };
    sendMessage(messageObj);

  }

  if (currentRoomMessages === undefined || !currentRoomMessages || currentRoomMessages == []) {
    return (<>Nothing to show</>)
  }

  return (
    <div className=' w-full bg-amber-300 h-screen text-white text-lg flex-col'>
      <div className='bg-white h-130 flex-col overflow-scroll' >

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
      <div className=' text-center '>

        <input value={inputData} onChange={(e) => setInputData(e.target.value)} type='text' name='sendbox' className='bg-black text-white '></input>
        <button onClick={() => handleOnClickSend()} className='bg-green-400 cursor-pointer hover:scale-110 text-white '>Send</button>

      </div>
    </div>
  )
}

export default ChatWindow
