import React, { useEffect, useRef } from 'react'
import useVideoCall from '../hooks/useVideoCall';
import VideoCallModal from '../modal/CallModal/VideoCallModal';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setIsModalOpen, setType } from '../features/modal/modalSlice';
import { EndCall, missCall, rejectCall, resetConnetion } from '../service/CallService';
import { endCall, acceptCall, initiateCall } from '../features/call/callSlice';
import VoiceCallModal from '../modal/CallModal/VoiceCallModal';
import IncomingCallModal from '../modal/CallModal/IncomingCallModal';
import { sendMessage } from '../websocket/websocket';

const VideoCallContainer = () => {
    const { localStream, remoteStream, declineCall, StartVideoCall, ReceiveVideoCall, HangUpCall } = useVideoCall();
    const { type } = useSelector((state) => state.modal);
    const { callData, remoteUser } = useSelector((state) => state.call);
    const loginUser = localStorage.getItem("loginUserName")
    const { selectedUserName, selectedUserId } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const selectedChatroomId = useSelector((state) => state.chat.selectedChatroomId);
    const callInitiated = useRef(false)

    const callStatus = useStore().getState().call.callStatus;

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (callStatus == "calling") {
                if (callInitiated.current) {
                    MissedCall(loginUser, selectedUserName, selectedChatroomId)
                }
            }
        }, 10000)
        if ((type === "video-call" || type === "voice-call") && !localStream && !callInitiated.current) {
            console.log("-----------CALL START---------- ")
            dispatch(initiateCall(selectedUserName))
            StartVideoCall(loginUser, selectedUserName, type)

            callInitiated.current = true;
        }

        return () => {
            clearTimeout(timeOut);
            console.log("CALL CLEANUP..............")
            callInitiated.current = true;


        }
    }, [dispatch, callStatus])
     const handleRejectCall = () => {
        dispatch(endCall())
        declineCall(loginUser,remoteUser)
    }
    const MissedCall = (senderName, targetUser, targetUserId) => {

        missCall(senderName, targetUser);
        dispatch(setIsModalOpen(false))
        dispatch(endCall());

        const messageObj = { content: "Missed " + type + " ", type: "missed-call", chatRoomId: targetUserId };
        sendMessage(messageObj);
    }

    const handleAcceptCall = async (callType) => {
        if (callType == "video-call") {
            dispatch(setType("video-call"))
        }
        else {
            dispatch(setType("voice-call"))
        }

        await ReceiveVideoCall(callData);
        dispatch(acceptCall())
    }


    const closeCall = () => {
        console.log("Call Ended " + remoteUser);
        HangUpCall(loginUser, remoteUser)
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
                return videoTrack.enabled;
            }

        }
        return false;
    }

    if (type === "incoming-call") {
        console.log("incoming call Data" + remoteUser)
        console.log(callData)
        return (
            <IncomingCallModal callType={callData.callType} handleRejectCall={handleRejectCall} dispatch={dispatch} localStream={localStream} callerName={callData.sender} onAccept={handleAcceptCall} />
        )
    }
    if (type === "video-call") {

        return (
            <VideoCallModal muteVideo={muteVideo} muteVoice={muteVoice} hangUpCall={closeCall} remoteStream={remoteStream} localStream={localStream} />
        )
    }
    if (type === "voice-call") {
        return (
            <VoiceCallModal muteVideo={muteVideo} muteVoice={muteVoice} hangUpCall={closeCall} remoteStream={remoteStream} localStream={localStream} />
        )
    }

}

export default VideoCallContainer
