import React, { useEffect, useRef } from 'react'
import useVideoCall from '../hooks/useVideoCall';
import VideoCallModal from '../modal/CallModal/VideoCallModal';
import { useDispatch, useSelector } from 'react-redux';
import IncomingVideoCallModal from '../modal/CallModal/IncomingVideoCallModal'
import { setIsModalOpen, setType } from '../features/modal/modalSlice';
import { EndCall, rejectCall, resetConnetion } from '../service/VoiceChatService/videoCallService';
import { endCall,acceptCall } from '../features/call/callSlice';

const VideoCallContainer = () => {
    const { localStream, remoteStream, declineCall, StartVideoCall, ReceiveVideoCall, HangUpCall } = useVideoCall();
    const {  type } = useSelector((state) => state.modal);
    const {callData} = useSelector((state)=> state.call);
    const loginUser = localStorage.getItem("loginUser");
    const { selectedUserName } = useSelector((state) => state.chat);
    const {remoteUser} = useSelector((state)=>state.call)
    const dispatch = useDispatch();

    const callInitiated = useRef(false)

    useEffect(() => {

        if (type === "video-call" && !localStream && !callInitiated.current) {
            console.log("-----------CALL START---------- ")
            StartVideoCall(loginUser, selectedUserName)
            callInitiated.current = true;
        }

        return () => {

            console.log("CALL CLEANUP..............")
            callInitiated.current = true;


        }
    }, [dispatch])

    const handleAcceptCall = async () => {
        console.log("call accepted ");
        // dispatch(acceptCall())
        console.info(callData)
        ReceiveVideoCall(callData);
        dispatch(setType("video-call"))


    }


    const closeCall = () => {
        console.log("Call Ended ");
        dispatch(endCall());
        
        HangUpCall(loginUser, remoteUser)
        dispatch(setIsModalOpen(false))
    }
    const handleRejectCall = () => {
        dispatch(endCall())
        console.log("Call rejected ");

        declineCall(loginUser, remoteUser)
        dispatch(setIsModalOpen(false))
    }

    const muteVoice = (localStream) => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                console.info("CAll muted")
                return audioTrack.enabled;
            }
        }
        return false;
    }
    const muteVideo = (localStream) => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                console.info("video hides muted")
                return videoTrack.enabled;
            }

        }
        return false;
    }

    if (type === "incoming-call") {
        return (
            <IncomingVideoCallModal handleRejectCall={handleRejectCall} dispatch={dispatch} localStream={localStream} callerName={callData.sender} onAccept={handleAcceptCall} />
        )
    }
    if (type === "video-call") {



        return (
            <VideoCallModal muteVideo={muteVideo} muteVoice={muteVoice} hangUpCall={closeCall} remoteStream={remoteStream} localStream={localStream} />
        )
    }

}

export default VideoCallContainer
