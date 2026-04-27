
import { data } from "react-router-dom";
import { sendSignal } from "../websocket/websocket";
import { toast } from "react-toastify";


let peerConnection = null;
let localStream = null;
let iceCandidateWaitingRoom = [];
let remoteStream = null;
let Listener = new Set();
let CallEndedListener = new Set();
let isMediaPending = false

const rtcConfig = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: "stun:stun1.l.google.com:19302" }
    ]
}

export const resetConnetion = () => {
    document.querySelectorAll('video').forEach(video => {
        if (video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => {
                console.log("☢️ Force-killing track:", track.kind);
                track.stop();
            });
            video.srcObject = null;
        }
    });
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        console.info("ALL TRACKS STOPED")
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    remoteStream = null;
    iceCandidateWaitingRoom = []

    return null;

}

export const onRemoteStreamRedy = (callback) => {
    Listener.add(callback);
    return () => Listener.delete(callback);
}
export const onCallEnded = (callback) => {
    CallEndedListener.add(callback);
    return () => Listener.delete(callback);
}

const createPeerConnection = (currentStream, currentUser, TargetUser) => {

    console.log("Peer connection building Start....")

    const pc = new RTCPeerConnection(rtcConfig);

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("....Sending ICE.....")
            sendSignal({
                type: "ice",
                data: event.candidate,
                sender: currentUser,
                targetUser: TargetUser
            })
        }
    }
    pc.onconnectionstatechange = () => {

        console.warn(" CONNETION STATE CHANGE to ", pc.connectionState)
        if (pc.connectionState == "disconnected") {
            window.location.reload()
        }
    }
    pc.oniceconnectionstatechange = () => {
        console.warn("ICE CONNETION STATE CHANGE to ", pc.iceConnectionState)

    }
    pc.ontrack = (event) => {

        if (event.streams[0])
            remoteStream = event.streams[0];


        event.streams[0].getTracks().forEach(track => {
            track.onunmute = () => {
                Listener.forEach(fn => fn(remoteStream))
            }
        })

    }


    if (currentStream) {
        console.warn("CURENES TREMA TO TRACK")
        console.log(currentStream)
        currentStream.getTracks().forEach((track) => pc.addTrack(track, currentStream));
    }
    peerConnection = pc;

    return pc;


}

export const SendCall = async (currentUser, TargetUser, callType) => {

    try {
        //Start fresh call everyTime
        resetConnetion();
        if (callType == "voice-call") {

            localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        else {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        }
        window.currentActiveStream = localStream;
        const pc = createPeerConnection(localStream, currentUser, TargetUser);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        sendSignal({
            type: "offer",
            data: offer,
            sender: currentUser,
            targetUser: TargetUser,
            callType: callType
        })
        console.info("PEERI IN SEND CALL" + peerConnection.connectionState)

        return localStream;

    } catch (error) {
        console.error(error)
    }
}

export const ReceiveCall = async (type, data, sender, targetUser, callType) => {

    if (!data) {
        throw ("Data is not in proper formate")
        return;
    }

    try {

        if (type === "offer") {
            try {
                if (isMediaPending) {
                    throw (" Blocked a duplicate camera request! ");
                    return;
                }
                isMediaPending = true;
                if (localStream) {
                    console.warn("Ghost stream detected! Killing old tracks...");
                    localStream.getTracks().forEach(track => track.stop());
                    localStream = null;
                }
                const currentUser = targetUser;
                const TargetUser = sender;

                if (callType == "voice-call") {

                    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                }
                else {
                    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

                }
                const pc = createPeerConnection(localStream, currentUser, TargetUser);

                await pc.setRemoteDescription(new RTCSessionDescription(data));


                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                //draining all iceCandidates

                for (const canidate of iceCandidateWaitingRoom) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(canidate));
                }
                iceCandidateWaitingRoom = [];

                sendSignal({
                    type: "answer",
                    data: answer,
                    sender: currentUser,
                    targetUser: TargetUser,
                    callType: callType
                })

                return localStream;


            } catch (error) {
                console.warn("OFFER ERROR")
                console.log(error)
                throw error
            }


        }
        else if (type === "answer") {

            try {

                console.warn("--Answer received--")
                if (!peerConnection) {
                    toast.info("unable to connect retry...");
                    window.location.reload();
            
                }


                if (peerConnection.signalingState === "have-local-offer") {


                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
                    console.warn("  set remote description ans came")

                    //draining all iceCandidates

                    for (const canidate of iceCandidateWaitingRoom) {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(canidate));
                    }
                }
                iceCandidateWaitingRoom = [];

            } catch (error) {
                console.warn("Answer Error!")
                console.error(error)
                throw error
            }
        }
        else if (type === "ice") {
            try {
                if (peerConnection && peerConnection.remoteDescription) {

                    await peerConnection.addIceCandidate(new RTCIceCandidate(data))

                } else {
                    console.warn("Can not set ICE before RemoteDescription")
                    console.log("ADDING ICE TO ROOM")
                    iceCandidateWaitingRoom.push(data);
                }

            } catch (error) {
                console.warn("ICE ERROR")
                console.error(error);
                throw error
            }
        }
        else if (type === "hang-up") {
            console.warn('------------------------------')
            console.log("sender" + sender)
            console.log("targetUser" + targetUser)
            console.warn('------------------------------')

            resetConnetion();
            isMediaPending = false;
            CallEndedListener.forEach(fn => fn());
            toast.info(sender + " hang up call");

        }
        else if (type == "decline") {
            console.warn('------------------------------')
            console.log("sender" + sender)
            console.log("targetUser" + targetUser)
            console.warn('------------------------------')
            resetConnetion();
            isMediaPending = false;
            CallEndedListener.forEach(fn => fn());
            toast.info("Call decline");
        }
        else {
            throw "No Signal type matched";
        }


    } catch (error) {
        console.error("Error in ReceiveCall " + error)
        resetConnetion();
        isMediaPending = false;
        throw error
    }
}

export const EndCall = (currentUser, targetUser) => {
    resetConnetion();
    sendSignal({
        type: "hang-up",
        data: "hanged up call",
        sender: currentUser,
        targetUser: targetUser
    })
    isMediaPending = false;
    return "Call hanged up"
}
export const missCall = (currentUser, targetUser) => {
    resetConnetion();
    sendSignal({
        type: "miss-call",
        data: "MissedCall",
        sender: currentUser,
        targetUser: targetUser
    })
    isMediaPending = false;
}
export const rejectCall = (currentUser, targetUser) => {

    console.warn('------------------------------')
    console.log("currentUser" + currentUser)
    console.log("targetUser" + targetUser)
    console.warn('------------------------------')
    isMediaPending = false;
    resetConnetion();
    sendSignal({
        type: "decline",
        data: "call rejected",
        sender: currentUser,
        targetUser: targetUser
    })
    toast.info("call rejected")




}

export const getLocalVideoRef = () => localStream;