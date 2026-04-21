import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp, subscribeToSignal } from '../../../websocket/websocket';
import { setData, setIsModalOpen, setType } from '../../../features/modal/modalSlice';
import { endCall, receiveCall, setCallData } from '../../../features/call/callSlice';
import useVideoCall from '../../../hooks/useVideoCall';

const SocketEventListener = () => {

    const dispatch = useDispatch();
    const { ReceiveVideoCall } = useVideoCall();


    useEffect(() => {
        let subscription = null;
        let isCurrent = true;
      
        connectToStomp(() => {
            if (isCurrent) {
                subscription = subscribeToSignal((receivedSignal) => {
                    if (receivedSignal.type === "offer") {
                            dispatch(setIsModalOpen(true));
                            dispatch(setType("incoming-call"))
                            dispatch(setCallData({
                                type: "offer",
                                sender: receivedSignal.sender,
                                data: receivedSignal.data,
                                targetUser: receivedSignal.targetUser
                            }))
                            dispatch(receiveCall(receivedSignal.sender))
                    }
                    else if (receivedSignal.type === "answer") {
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
                })
            }
        })

        return () => {
            isCurrent = false;
            console.log("cleaning.........")
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [])



    return null;
}

export default SocketEventListener
