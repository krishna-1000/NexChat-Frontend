// import { sendSignal } from "../../websocket/websocket";

import { data } from "react-router-dom";
import { sendSignal } from "../../websocket/websocket";

// let peerConnection = null;
// let localStream = null;
// let remoteStream = null;
// let iceCandidateWaitingRoom = [];
// let Listener = new Set();

// const rtcConfig = {
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// };


// // 1. A CLEANUP FUNCTION TO PREVENT ZOMBIE STATES
// export const resetWebRTCState = () => {
//     console.warn("🧹 CLEANING UP WEBRTC STATE...");
//     if (peerConnection) {
//         peerConnection.close();
//         peerConnection = null;
//     }
//     if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//         localStream = null;
//     }
//     iceCandidateWaitingRoom = [];
//     remoteStream = null;
// };

// export const onRemoteStreamRedy = (callback) => {
//     Listener.add(callback);
//     return () => Listener.delete(callback);
// };

// // 2. PEER CONNECTION WITH DYNAMIC NAMES
// const createPeerConnetion = (currentStream, myName, remoteUserName) => {
//     const pc = new RTCPeerConnection(rtcConfig);

//     pc.onicecandidate = (event) => {
//         if (event.candidate) {
//             console.log(`🧊 Sending ICE from ${myName} to ${remoteUserName}`);
//             sendSignal({
//                 type: 'ice',
//                 data: event.candidate,
//                 sender: myName,
//                 targetUser: remoteUserName
//             });
//         }
//     };

//     pc.oniceconnectionstatechange = () => {
//         console.warn(`🚦 ICE STATE CHANGE: ${pc.iceConnectionState}`);
//     };

//     pc.onsignalingstatechange = () => {
//         console.log(`📡 SIGNALING STATE CHANGE: ${pc.signalingState}`);
//     };

//     pc.ontrack = (event) => {
//         console.warn("🎥 ON TRACK FIRED......");
//         if (event.streams && event.streams[0]) {
//             remoteStream = event.streams[0];

//             event.streams[0].getTracks().forEach(track => {
//                 console.log(`Track ${track.kind} muted property:`, track.muted);

//                 track.onunmute = () => {
//                     console.log(`✅ Track ${track.kind} UNMUTED! Data is now flowing!`);
//                     Listener.forEach(fn => fn(remoteStream));
//                 };
//             });

//             // Fallback just in case it connects instantly
//             if (!event.streams[0].getTracks()[0].muted) {
//                 Listener.forEach(fn => fn(remoteStream));
//             }
//         }
//     };

//     if (currentStream) {
//         currentStream.getTracks().forEach((track) => pc.addTrack(track, currentStream));
//     }

//     peerConnection = pc;
//     return pc;
// };

// // 3. CALLER LOGIC
// export const SendCall = async ( senderName,targetUserName) => {
//     console.log(`📞 Initiating call from ${senderName} to ${targetUserName}`);
//     resetWebRTCState(); // Always start fresh!

//     try {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//         const pc = createPeerConnetion(localStream, senderName, targetUserName);

//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);

//         sendSignal({
//             type: 'offer',
//             data: offer,
//             targetUser: targetUserName,
//             sender: senderName
//         });

//         return localStream;
//     } catch (error) {
//         // FULL STACK TRACE IF CAMERA FAILS
//         console.error("❌ Error in SendCall:", error); 
//     }
// };

// // 4. RECEIVER LOGIC
// export const ReceiveCall = async (signal) => {
//     if (!signal || !signal.data) return;

//     try {
//         if (signal.type === "offer") {
//             console.log("📥 Received Offer. Processing...");


//             const myName = signal.targetUser;
//             const remoteName = signal.sender;

//             localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             const pc = createPeerConnetion(localStream, myName, remoteName);

//             await pc.setRemoteDescription(new RTCSessionDescription(signal.data));

//             // Safely drain queued ICE
//             for (const candidate of iceCandidateWaitingRoom) {
//                 let candidateData = typeof candidate === 'string' ? JSON.parse(candidate) : candidate;
//                 await pc.addIceCandidate(new RTCIceCandidate(candidateData));
//                 console.log("✅ SETTED QUEUED ICE SUCCESSFULLY");
//             }
//             iceCandidateWaitingRoom = [];

//             const answer = await pc.createAnswer();
//             await pc.setLocalDescription(answer);

//             console.log("📤 Sending Answer...");
//             sendSignal({
//                 type: 'answer',
//                 data: answer,
//                 targetUser: remoteName,
//                 sender: myName
//             });

//             return localStream;

//         } else if (signal.type === "answer") {
//             console.log("📥 Received Answer. Processing...");
//             if (!peerConnection) {
//                 console.error("❌ No peer connection found to apply answer!");
//                 return;
//             }

//             if (peerConnection.signalingState === "have-local-offer") {
//                 await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.data));
//                 console.log("✅ Remote description set successfully.");

//                 // Safely drain queued ICE
//                 for (const candidate of iceCandidateWaitingRoom) {
//                     let candidateData = typeof candidate === 'string' ? JSON.parse(candidate) : candidate;
//                     await peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
//                     console.log("✅ SETTED QUEUED ICE SUCCESSFULLY");
//                 }
//                 iceCandidateWaitingRoom = [];
//             } else {
//                 console.warn(`⚠️ Cannot process answer, PC state is: ${peerConnection.signalingState}`);
//             }

//         } else if (signal.type === "ice") {
//             let candidateData = typeof signal.data === 'string' ? JSON.parse(signal.data) : signal.data;

//             if (peerConnection && peerConnection.remoteDescription) {
//                 await peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
//                 console.log(`✅ SETTED ICE SUCCESSFULLY for ${signal.targetUser}`);
//             } else {
//                 console.log("🧊 Queuing ICE candidate...");
//                 iceCandidateWaitingRoom.push(candidateData);
//             }
//         }
//     } catch (error) {
//         // FULL STACK TRACE FOR WEBRTC ERRORS
//         console.error(`❌ Error processing ${signal.type}:`, error); 
//     }
// };

// export const getLocalVideoRef = () => localStream;


let peerConnection = null;
let localStream = null;
let iceCandidateWaitingRoom = [];
let remoteStream = null;
let Listener = new Set();
let CallEndedListener = new Set();

const rtcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

const resetConnetion = () => {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    remoteStream = null;
    iceCandidateWaitingRoom = []

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

export const SendCall = async (currentUser, TargetUser) => {

    try {
        //Start fresh call everyTime
        resetConnetion();
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const pc = createPeerConnection(localStream, currentUser, TargetUser);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        sendSignal({
            type: "offer",
            data: offer,
            sender: currentUser,
            targetUser: TargetUser
        })

        return localStream;

    } catch (error) {
        console.error(error)
    }
}

export const ReceiveCall = async (signal) => {

    if (!signal || !signal.data) {
        console.error("Data is not in proper formate")
        return;
    }

    try {

        if (signal.type === "offer") {
            try {
                const currentUser = signal.targetUser;
                const TargetUser = signal.sender;
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

                const pc = createPeerConnection(localStream, currentUser, TargetUser);
                await pc.setRemoteDescription(new RTCSessionDescription(signal.data));


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
                    targetUser: TargetUser
                })

                return localStream;


            } catch (error) {
                console.warn("OFFER ERROR")
                console.log(error)
            }


        }
        else if (signal.type === "answer") {

            try {
                console.warn(signal)
                console.warn("anwer come")
                if (!peerConnection) {
                    console.log("Peer connetion is not available")
                    return;
                }
                if (peerConnection.signalingState === "have-local-offer") {


                    await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.data));
                    console.warn("  set remote ans come")

                    //draining all iceCandidates

                    for (const canidate of iceCandidateWaitingRoom) {
                        await peerConnection.addIceCandidate(new RTCIceCandidate(canidate));
                    }
                }
                iceCandidateWaitingRoom = [];

            } catch (error) {
                console.warn("Answer Error!")
                console.error(error)
            }
        }
        else if (signal.type === "ice") {
            try {
                if (peerConnection && peerConnection.remoteDescription) {

                    await peerConnection.addIceCandidate(new RTCIceCandidate(signal.data))

                } else {
                    console.warn("Can not set ICE before RemoteDescription")
                    console.log("ADDING ICE TO ROOM")
                    iceCandidateWaitingRoom.push(signal.data);
                }

            } catch (error) {
                console.warn("ICE ERROR")
                console.error(error);
            }
        }
        else if (signal.type === "hang-up") {

            resetConnetion();
            CallEndedListener.forEach(fn => fn());
            alert("reciver disconnected")

        }


    } catch (error) {
        console.error(error)
    }
}

export const EndCall = async (currentUser, targetUser) => {

    resetConnetion();
    sendSignal({
        type: "hang-up",
        data: "hanged up call",
        sender: currentUser,
        targetUser: targetUser
    })
    alert("hang up succesfully!")

}

export const getLocalVideoRef = () => localStream;