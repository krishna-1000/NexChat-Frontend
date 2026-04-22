import { createSlice } from '@reduxjs/toolkit'
import React, { act } from 'react'
import { setError, setLoading } from '../user/userSlice'

const initialState = {
    selectedUserId: "",
    selectedUserName: "",
    chatLoading: false,
    chatMessages: {},
    chatRoomsId: {},
    chatError: null,
    messageSender:{}

}
const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload
        },
        setSelectedUserName: (state, action) => {
            state.selectedUserName = action.payload
        },
        setChatMessages: (state, action) => {
            const { roomId, messages } = action.payload;
            state.chatMessages[roomId] = messages;

        },
        appendMessage: (state, action) => {
            const { roomId, message } = action.payload;

            if (!state.chatMessages[roomId]) {
                state.chatMessages[roomId] = [];
            }
            state.chatMessages[roomId].push(message);
        },
        setChatRoomsId: (state, action) => {
            const { userId, chatRoomId } = action.payload
            state.chatRoomsId[userId] = chatRoomId
        },
        setChatLoading: (state, action) => {
            state.loading = action.payload
        },
        setChatError: (state, action) => {
            state.error = action.payload
        },
        setMessageSender: (state, action) => {
            const senderId  = action.payload

            if(!state.messageSender[senderId]){
                state.messageSender[senderId] = 0;
            }

            state.messageSender[senderId]++;
            
        },
    }
})

export const {setMessageSender, setSelectedUserName, setChatLoading, appendMessage, setChatError, setSelectedUserId, setChatMessages, setChatRoomsId } = chatSlice.actions
export default chatSlice.reducer;

