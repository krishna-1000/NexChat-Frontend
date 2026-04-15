import React, { useEffect } from 'react'
import useVideoCall from '../hooks/useVideoCall';
import VideoCallModal from '../modal/CallModal/VideoCallModal';
import { useDispatch, useSelector } from 'react-redux';
import IncomingVideoCallModal from '../modal/CallModal/IncomingVideoCallModal'
import { setIsModalOpen, setType } from '../features/modal/modalSlice';
import { EndCall } from '../service/VoiceChatService/videoCallService';

const VideoCallContainer = () => {
    const { localStream, remoteStream, StartVideoCall, ReceiveVideoCall } = useVideoCall();
    const { data, type } = useSelector((state) => state.modal);
    const loginUser = localStorage.getItem("loginUser");
    const { selectedUserName } = useSelector((state) => state.chat);
    const dispatch = useDispatch();


    useEffect(() => {
        if (type === "video-call" && !localStream) {
            StartVideoCall(loginUser, selectedUserName)
        }
    }, [dispatch])

    const handleAcceptCall = async () => {
        console.log("call accepted ");
        console.info(data)
        ReceiveVideoCall(data);
        dispatch(setType("video-call"))


    }
    const hangUpCall = async () => {
        
        
        console.log("Call Ended ");
        EndCall(loginUser, selectedUserName);
        dispatch(setIsModalOpen(false))


    }

    if (type === "incoming-call") {
        return (
            <IncomingVideoCallModal dispatch={dispatch} localStream={localStream} callerName={data.callerName} onAccept={handleAcceptCall} />
        )
    }
    if (type === "video-call") {



        return (
            <VideoCallModal hangUpCall={hangUpCall} remoteStream={remoteStream} localStream={localStream} />
        )
    }

}

export default VideoCallContainer
