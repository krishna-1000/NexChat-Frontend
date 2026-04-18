import { useDispatch } from "react-redux";
import { EndCall, getLocalVideoRef, onCallEnded, onRemoteStreamRedy, ReceiveCall, SendCall } from "../service/VoiceChatService/videoCallService";
import { initiateCall } from "../features/call/callSlice";
import { useEffect, useState } from "react";
import { setIsModalOpen } from "../features/modal/modalSlice";

const useVideoCall = () => {
    const [localStream, setLocalStream] = useState(getLocalVideoRef())
    const [remoteStream, setRemoteStream] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onRemoteStreamRedy((stream) => {
            setRemoteStream(stream)
        })
        const unsubscribe2 = onCallEnded(() => {
            console.info("CALL ENDER FIRE")
            remoteStream?.getTracks().forEach(track => {
                track.stop()
            });
            localStream?.getTracks().forEach(track => { track.stop() })
            setLocalStream(null);
            setRemoteStream(null);
            dispatch(setIsModalOpen(false));

        })

        return () => {
            unsubscribe();
            unsubscribe2();
        }
    }, [])

    const StartVideoCall = async (senderName, targetUser) => {

        try {

            const localStream = await SendCall(senderName, targetUser);
            if (localStream) {
                console.log("Stream received in hook:", localStream);
                setLocalStream(localStream); // This triggers the re-render for your Modal
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const ReceiveVideoCall = async (signal) => {
        try {
            console.log("receiving ...... in useVideoCall")

            const localStream = await ReceiveCall(signal)

            if (localStream) {
                setLocalStream(localStream);
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    const HangUpCall =  (senderName, targetUser) => {
        console.log("STREAM IN HANG UP CALL")
        console.log(localStream)
        console.log(remoteStream)
        EndCall(senderName, targetUser);
       
        setLocalStream(null)
        setRemoteStream(null)
        dispatch(setIsModalOpen(false))

    }


    return { StartVideoCall, HangUpCall, remoteStream, localStream, ReceiveVideoCall };
}

export default useVideoCall;