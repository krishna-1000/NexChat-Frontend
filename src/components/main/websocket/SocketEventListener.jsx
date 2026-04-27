import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp, subscribeToSignal } from '../../../websocket/websocket';
import { clearModal, setData, setIsModalOpen, setType } from '../../../features/modal/modalSlice';
import { acceptCall, endCall, receiveCall, setCallData } from '../../../features/call/callSlice';
import useVideoCall from '../../../hooks/useVideoCall';
import { toast } from 'react-toastify';

const SocketEventListener = () => {
    const callStatus = useSelector((state) => state.call.callStatus);

    const dispatch = useDispatch();
    const { ReceiveVideoCall } = useVideoCall();
    // const callStatusRef = useRef(callStatus);

    // useEffect(() => {
    //     callStatusRef.current = callStatus
    // }, [callStatus])

    useEffect(() => {
        let subscription = null;
        let isCurrent = true;

        connectToStomp(() => {
            if (isCurrent) {
                subscription = subscribeToSignal((receivedSignal) => {
                    if (receivedSignal.type === "offer") {

                        dispatch(setCallData({
                            type: "offer",
                            sender: receivedSignal.sender,
                            data: receivedSignal.data,
                            targetUser: receivedSignal.targetUser,
                            callType: receivedSignal.callType
                        }))
                        dispatch(receiveCall(receivedSignal.sender))
                        dispatch(setIsModalOpen(true));
                        dispatch(setType("incoming-call"))
                    }
                    else if (receivedSignal.type === "answer") {
                        console.warn("in SocketEventListener answer")
                        dispatch(acceptCall());
                        ReceiveVideoCall(receivedSignal)
                    }
                    else if (receivedSignal.type === "ice") {
                        console.log("ice is recieved and matched...")
                        console.log(receivedSignal)
                        ReceiveVideoCall(receivedSignal)
                    }
                    else if (receivedSignal.type === "hang-up") {
                        console.log("call Ended of other person")
                        console.log(receivedSignal)
                        dispatch(endCall())
                        ReceiveVideoCall(receivedSignal)
                    }
                    else if (receivedSignal.type === "decline") {
                        console.log("call rejected")
                        dispatch(endCall())
                        console.log(receivedSignal)
                        ReceiveVideoCall(receivedSignal)
                    }
                    else if (receivedSignal.type === "miss-call") {
                        console.log("MissedCall received")
                        console.log(receivedSignal)
                        toast.info("missed call of " + receivedSignal.sender)
                        dispatch(clearModal());
                        dispatch(endCall());

                    }
                })
            }
        })

        return () => {
            isCurrent = false;
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [])



    return null;
}

export default SocketEventListener
