import React, { useEffect, useRef } from 'react'
import useVideoCall from '../hooks/useVideoCall';
import VideoCallModal from '../modal/CallModal/VideoCallModal';
import { useDispatch, useSelector } from 'react-redux';
import IncomingVideoCallModal from '../modal/CallModal/IncomingVideoCallModal'
import { setIsModalOpen, setType } from '../features/modal/modalSlice';
import { EndCall, resetConnetion } from '../service/VoiceChatService/videoCallService';

const VideoCallContainer = () => {
    const { localStream, remoteStream, StartVideoCall, ReceiveVideoCall, HangUpCall } = useVideoCall();
    const { data, type } = useSelector((state) => state.modal);
    const loginUser = localStorage.getItem("loginUser");
    const { selectedUserName } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const callInitiated = useRef(false)

    useEffect(() => {

        if (type === "video-call" && !localStream && !callInitiated.current) {
            console.log("-----------CALL START---------- ")
            StartVideoCall(loginUser, selectedUserName)
            callInitiated.current = true;
        }

        return () => {

            resetConnetion();
            console.log("CALL CLEANUP..............")
            callInitiated.current = false;

            console.log("ghost meadia stream")
            if (window.currentActiveStream) {
                console.log("Host")
                console.log(window.currentActiveStream)
                window.currentActiveStream.getTracks().forEach(track => track.stop());
                window.currentActiveStream = null;
                console.log("after clean ghost stream")
                console.log(window.currentActiveStream)
            }


        }
    }, [dispatch])

    const handleAcceptCall = async () => {
        console.log("call accepted ");
        console.info(data)
        ReceiveVideoCall(data);
        dispatch(setType("video-call"))


    }
    const closeCall = () => {
        console.log("Call Ended ");
        HangUpCall(loginUser, selectedUserName)
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
            <IncomingVideoCallModal dispatch={dispatch} localStream={localStream} callerName={data.callerName} onAccept={handleAcceptCall} />
        )
    }
    if (type === "video-call") {



        return (
            <VideoCallModal muteVideo={muteVideo} muteVoice={muteVoice} hangUpCall={closeCall} remoteStream={remoteStream} localStream={localStream} />
        )
    }

}

export default VideoCallContainer
