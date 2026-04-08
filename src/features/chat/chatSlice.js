import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { setError, setLoading } from '../user/userSlice'

const initialState = {
    selectedUserId: "",
    chatLoading:false,
    chatMessages: [],
    chatRoomId:"",
    chatError:null

}
const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload
        },
        setChatMessages: (state, action) => {
            state.chatMessages = action.payload
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

export const {setChatLoading,setChatError, setSelectedUserId, setChatMessages,setChatRoomId } = chatSlice.actions
export default chatSlice.reducer;

