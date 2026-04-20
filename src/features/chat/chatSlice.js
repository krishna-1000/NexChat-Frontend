import { createSlice } from '@reduxjs/toolkit'
import React, { act } from 'react'
import { setError, setLoading } from '../user/userSlice'

const initialState = {
    selectedUserId: "",
    selectedUserName: "",
    chatLoading: false,
    chatMessages: {},
    chatRoomId: "",
    chatError: null

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
        setChatRoomId: (state, action) => {
            state.chatRoomId = action.payload
        },
        setChatLoading: (state, action) => {
            state.loading = action.payload
        },
        setChatError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const { setSelectedUserName, setChatLoading, appendMessage, setChatError, setSelectedUserId, setChatMessages, setChatRoomId } = chatSlice.actions
export default chatSlice.reducer;

