import React from 'react'
import { fetchChatroom } from '../../api/chat/chatApi';
import { setError, setLoading } from '../../features/user/userSlice';
import { setChatMessages, setChatRoomId } from '../../features/chat/chatSlice';
import { fetchGroup } from '../../api/chat/groupChatApi';
import { setGroupAdmin } from '../../features/chat/groupSlice';

const fetchGroupChatService =async (dispatch, recieverId) => {
   

        try {
            dispatch(setLoading(true));
            const chat = await fetchGroup(recieverId);
            if (chat.data) {
                dispatch(setChatRoomId(chat.data.id));
                dispatch(setGroupAdmin(chat.data.createdBy))
                dispatch(setChatMessages({ roomId: chat.data.id, messages: chat.data.messages }));
            }
            console.log(chat.data)
        } catch (error) {
            dispatch(setError(error.message))
            console.log(error.message)
        }
        finally {
            dispatch(setLoading(false))
        }

    }


export default fetchGroupChatService
