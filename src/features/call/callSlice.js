import { createSlice } from "@reduxjs/toolkit";
import { createInitialState } from "../intialStateHelper";
import { toast } from "react-toastify";


const initialState = createInitialState({
    isCallActive: false,
    callStatus: 'idle',
    remoteUser: null,
    isMuted: false,
    isVideoOff: false,
    callData: []
})

const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        initiateCall: (state, action) => {
            state.isCallActive = true;
            state.callStatus = 'calling';
            state.remoteUser = action.payload;
        },
        receiveCall: (state, action) => {
            state.isCallActive = true;
            state.callStatus = 'ringing';
            state.remoteUser = action.payload;
        },
        acceptCall: (state) => {
            state.callStatus = 'connected';
        },
        endCall: (state) => {
            return initialState;
        },
        toggleAudio: (state) => {
            state.isMuted = !state.isMuted;
        },
        setCallData: (state, action) => {
            console.warn(action.payload)
            state.callData = action.payload
            console.warn(state.callData)
        },
        setCallLoading: (state, action) => {
            state.loading = action.payload
        },
        setCallError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const { setCallError, setCallLoading, initiateCall, setCallData, receiveCall, acceptCall, endCall, toggleAudio } = callSlice.actions;
export default callSlice.reducer;