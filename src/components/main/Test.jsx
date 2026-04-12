import React, { useEffect, useRef } from 'react'
import { connectToStomp, sendSignal, subscribeToSignal } from '../../websocket/websocket';
import { data } from 'react-router-dom';

const Test = () => {

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const isHandShackDone = useRef(false);
    
    const iceCandidateWaitingRoom = useRef([]);

    const rtcConfig = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    }

    useEffect(() => {
        let isCurrent = true;
        let subscription = null;
        connectToStomp(() => {
            console.log("BEFORE",isCurrent)
            if (isCurrent) {
                subscription = subscribeToSignal((receivedSignal) => {
                    console.log(receivedSignal);
                    handleReceiveSignal(receivedSignal);
                })
            } else {
                console.error("SUB-0 is live",isCurrent)
            }

        })

        return () => {
            isCurrent = false;
            console.log("Cleanup triggered");
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }, [])

    const createPeerConnection = (currentStream) => {

        const pc = new RTCPeerConnection(rtcConfig);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal({
                    type: "ice",
                    data: event.candidate,
                    targetUser: "raj"
                })
            }
        }
        pc.onsignalingstatechange = () => {
            console.log("!!! SIGNALING STATE CHANGE:", pc.signalingState);
        };

        pc.ontrack = (event) => {
            console.error("ON TRACK FIRED...............")
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
                setTimeout(() => {
                    remoteVideoRef.current.play().catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error("Critical Play Error:", err);
                        }
                    });
                }, 150);
            }
        }

        if (currentStream) {
            currentStream.getTracks().forEach((track) => pc.addTrack(track, currentStream));
        }

        peerConnection.current = pc;
        return pc;
    }

    const startCall = async () => {

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            const pc = createPeerConnection(stream);

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            if (offer) {
                console.log(offer)
                sendSignal({
                    type: "offer",
                    data: offer,
                    targetUser: "raj"
                })
            }

        } catch (error) {
            console.log("this it warning ")
            console.warn(error)
        }

    }

    const handleReceiveSignal = async (signal) => {



        try {

            if (signal.type == "offer") {
                if (!signal.data || !signal.data.sdp) {
                    console.warn("Data is not in proper formate moving ahead")
                    return;
                }
                if (peerConnection.current && peerConnection.current.signalingState !== "stable") {
                    console.warn("Incoming offer ignored because a connection is already in progress.");
                    return;
                }
                console.log(signal);
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                const pc = createPeerConnection(stream);
                await pc.setRemoteDescription(new RTCSessionDescription(signal.data));


                //draining iceCandidates

                iceCandidateWaitingRoom.current.forEach(async (candidate) => {
                    console.log("adding all ice candidate which arrived before setRemoteDescrition")
                    pc.addIceCandidate(new RTCIceCandidate(candidate));
                })
                iceCandidateWaitingRoom.current = [];

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                sendSignal({
                    type: "answer",
                    data: answer,
                    targetUser: signal.sender
                })
                console.log("ANSER SENDED")
            }
            else if (signal.type == "answer") {
                if (!signal.data || !signal.data.sdp) {
                    console.warn("Data is not in proper formate moving ahead")
                    return;
                }

                console.log("this is awnser side")

                const currentState = peerConnection.current?.signalingState;
                console.log("ANSWER ARRIVED. Current State:", currentState);

                if (isHandShackDone.current && peerConnection.current.signalingState === "have-local-offer") {
                    console.log("HandShakeisALready done ")
                    return;
                }

                if (peerConnection.current.signalingState === "have-local-offer") {
                    console.log("ENTERING TO")
                    isHandShackDone.current = true;
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.data))
                    console.log(".....set description of answer....")
                    //draining icecandidates         
                    iceCandidateWaitingRoom.current.forEach(async (candidate) => {
                        console.log("adding all ice candidate which arrived before setRemoteDescrition")
                        pc.addIceCandidate(new RTCIceCandidate(candidate));
                    })
                    iceCandidateWaitingRoom.current = [];

                } else {
                    console.error("CONNECTON IS IN THIS STATE", peerConnection.current.signalingState)
                }


            }
            else if (signal.type == "ice") {

                console.log("ICE CANDIDATE COME TO SAVE ")
                if (peerConnection.current && peerConnection.current.remoteDescription) {

                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal.data));
                    console.log("SETTED ICE")
                }
                else {
                    console.warn("peer connection is not stable for ICE")
                    iceCandidateWaitingRoom.current.push(signal.data);
                }
            }
        }
        catch (error) {
            console.log("big warning")
            console.log(error);
        }
    }
    return (
        <div style={{ padding: '20px' }}>
            <h2>NextChat Video Call Test</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>MY STREAM</label>
                    <video ref={localVideoRef} autoPlay muted style={{ width: '300px', backgroundColor: 'black' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>RECEIVER STREAM</label>
                    <video ref={remoteVideoRef} autoPlay style={{ width: '300px', backgroundColor: 'black' }} />
                </div>

                <button
                    onClick={() => startCall()}
                    style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                    Call RAJ
                </button>
            </div>
        </div>
    )
}

export default Test
