import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isCallActive: false,
    callStatus: 'idle', // 'idle', 'ringing', 'calling', 'connected'
    remoteUser: null,
    isMuted: false,
    isVideoOff: false,
    callData: []
}

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
            return initialState; // Reset everything
        },
        toggleAudio: (state) => {
            state.isMuted = !state.isMuted;
        },
        setCallData: (state, action) => {
            console.log("warning of setting datat ")
            console.warn(action.payload)
            state.callData = action.payload
            console.log("warning AGIM.... ")
            console.warn(state.callData)
        }
    }
});

export const { initiateCall,setCallData, receiveCall, acceptCall, endCall, toggleAudio } = callSlice.actions;
export default callSlice.reducer;