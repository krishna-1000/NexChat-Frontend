import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connectToStomp, subscribeToSignal } from '../../../websocket/websocket';
import { setData, setIsModalOpen, setType } from '../../../features/modal/modalSlice';
import { receiveCall } from '../../../features/call/callSlice';
import useVideoCall from '../../../hooks/useVideoCall';

const SocketEventListener = () => {

    const dispatch = useDispatch();
    const { ReceiveVideoCall } = useVideoCall();


    useEffect(() => {
        let subscription = null;
        let isCurrent = true;
        /*
        receivedSignal =
        {
        type:"offer",
        data:{ sdp:"dksfjslfkljs",type:"offer"},
        sender : krishna,
        targetUser: raj
        }
         */
        connectToStomp(() => {
            if (isCurrent) {
                subscription = subscribeToSignal((receivedSignal) => {
                    console.log(receivedSignal)
                    if (receivedSignal.type === "offer") {
                        console.log("offer is matching.......")
                       
                            dispatch(setIsModalOpen(true));
                            dispatch(setType("incoming-call"))
                            dispatch(setData({
                                type: "offer",
                                sender: receivedSignal.sender,
                                data: receivedSignal.data,
                                targetUser: receivedSignal.targetUser
                            }))
                    }
                    else if (receivedSignal.type === "answer") {
                        console.log("anser is recieved and matched...")
                        console.log(receivedSignal)
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
                        ReceiveVideoCall(receivedSignal)
                    }
                    else if (receivedSignal.type === "decline") {
                        console.log("call rejected")
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
