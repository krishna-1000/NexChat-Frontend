import React, { useState } from 'react'
import Message from './SendMessage'
import SendMessage from './SendMessage';
import RecieveMessage from './RecieveMessage';

const ChatWindow = () => {
  const [isSend, setIsSend] = useState(false);
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([{}]);

  const handleOnClickSend = () => {
    if (inputData.length == "") {
      return;
    }
    setIsSend(true);
    setMessages((prev) => [...prev, { message: inputData, isSend: true }]);

  }



  return (
    <div className=' w-full bg-amber-300 h-screen text-white text-lg flex-col'>
      <div className='bg-white h-130 flex-col overflow-scroll' >

        {
          messages.map((item, index) =>
            <li className={item.isSend ? 'flex justify-end mb-3' : 'mb-3'} key={index}>{item.isSend ? <SendMessage message={item.message} /> : <RecieveMessage message={item.message} />}</li>
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
