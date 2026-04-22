import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import chatReducer from '../features/chat/chatSlice'
import modalReducer from '../features/modal/modalSlice'
import CallReducer from '../features/call/callSlice'
import groupReducer from '../features/chat/groupSlice'
import profileReducer from '../features/user/profileSlice'



export const store = configureStore({
    reducer: {profile:profileReducer, user: userReducer, chat: chatReducer,modal:modalReducer ,call:CallReducer,group:groupReducer}
});