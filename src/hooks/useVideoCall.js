import { useDispatch, useSelector, useStore } from "react-redux";
import { EndCall, getLocalVideoRef, missCall, onCallEnded, onRemoteStreamRedy, ReceiveCall, rejectCall, SendCall } from "../service/CallService";
import { endCall, initiateCall, receiveCall, setCallError } from "../features/call/callSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { setIsModalOpen } from "../features/modal/modalSlice";
import { toast } from "react-toastify";

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

    const StartVideoCall = async (senderName, targetUser, callType) => {

        try {

            const localStream = await SendCall(senderName, targetUser, callType);
        
            if (localStream) {
                setLocalStream(localStream);
            }
        } catch (error) {
            setCallError(error)
            dispatch(endCall());
            throw error
        }
    }

    const ReceiveVideoCall = useCallback(async (signal) => {
        try {
            
            const { type = "no Type", data, sender, targetUser, callType } = signal;

            const localStream = await ReceiveCall(type, data, sender, targetUser, callType)
            
            if (localStream) {

                setLocalStream(localStream);
                dispatch(receiveCall(signal.sender))
            }

        } catch (error) {
            throw error
        }
    },[dispatch])


    const HangUpCall = (senderName, targetUser) => {

        const res = EndCall(senderName, targetUser);
        toast.success(res);
        setLocalStream(null)
        setRemoteStream(null)
        dispatch(setIsModalOpen(false))
        dispatch(endCall());

    }

    const declineCall = (loginUser,remoteUser)=>{
         rejectCall(loginUser, remoteUser);
        dispatch(setIsModalOpen(false))
    }




    return {declineCall, StartVideoCall, HangUpCall, remoteStream, localStream, ReceiveVideoCall };
}

export default useVideoCall;