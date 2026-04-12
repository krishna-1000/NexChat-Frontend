import React, { useEffect, useRef, useState } from 'react';
import { connectToStomp, sendSignal, subscribeToSignal } from '../../websocket/websocket';

const Temp = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const pendingIceCandidates = useRef([]);

  const [localStream, setLocalStream] = useState(null);

  const rtcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  useEffect(() => {
    let isSubscribed = true; // Guard to prevent double execution in React Strict Mode

     connectToStomp(() => {
      subscribeToSignal((receivedSignal) => {
        if (!isSubscribed) return;
        console.log("Incoming signal:", receivedSignal.type);
        handleReceiveSignal(receivedSignal);
      });
    },[]);

    // Cleanup function: Prevents the "stable" state crash by ignoring duplicate listeners
    return () => {
      isSubscribed = false;

      console.log("Cleaned up WebSocket listeners");
    };
  }, []); // Fixed: Changed from [1] to [] so it only runs once on mount

  // FIX: Pass the 'stream' directly as an argument. 
  // Relying on the 'localStream' state variable here fails because React updates state asynchronously.
  const createPeerConnection = (currentStream) => {
    console.log("come to create peer connection ")
    const pc = new RTCPeerConnection(rtcConfig);

    pc.onicecandidate = (event) => {
      console.log("on ice candidate fired")
      if (event.candidate) {
        console.log("ICE CANDIDATE FIRED IN CONDITION")
        sendSignal({
          type: "ice",
          data: event.candidate,
          targetUser: "raj" // Note: You currently have this hardcoded
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("on track fired ")
      if (remoteVideoRef.current) {
        console.log("on track fired IN CONDITION ")
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Add our local video/audio tracks using the fresh stream, not the state variable
    if (currentStream) {
      console.log("adding local video and audio track to currentStream")
      currentStream.getTracks().forEach(track => pc.addTrack(track, currentStream));
    }

    peerConnection.current = pc;
    console.log("returning peer connection")
    return pc;
  };

  const startCall = async () => {
    console.log("calling start")
    try {
      // 1. Get camera and mic safely
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("gather stream on call start")

      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setLocalStream(stream);

      // 2. Pass the stream directly to the engine
      console.log("give stream to create PeerCOn it will create ice and track")

      const pc = createPeerConnection(stream);

      // 3. Create and send the SDP Offer
      const offer = await pc.createOffer();
      console.log("offer created to send and set to localDescription of PC")
      await pc.setLocalDescription(offer);
      console.log("offer seted ")

      sendSignal({
        type: 'offer',
        data: offer,
        targetUser: "raj"
      });
      console.log("offer sended to raj")
    } catch (error) {
      console.error("Failed to start call. Camera access denied or busy:", error);
      alert("Could not access camera/microphone. Is it being used by another app?");
    }
  };

  const handleReceiveSignal = async (signal) => {
    console.log("reciving call start")

    if (signal.type === 'offer') {
      if (peerConnection.current && peerConnection.current.signalingState !== "stable") {
        console.warn("Incoming offer ignored because a connection is already in progress.");
        return;
      }

      try {
        // User B gets the offer and requests camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
        console.log("stream set to localStream and video ref to show of reciever side ")

        // Pass the stream explicitly to avoid React timing issues
        const pc = createPeerConnection(stream);
        await pc.setRemoteDescription(new RTCSessionDescription(signal.data));
        console.log("RECIEVER create peer conntion and set Remote Description as it comes from KRISHNA ")


        // Drain the waiting room for User B
        pendingIceCandidates.current.forEach(async (candidate) => {
          console.log("adding all ice candidate which arrived before setRemoteDescrition")
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
        pendingIceCandidates.current = [];

        // Create and send the Answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log("RECIVER creating answer to send krishna but before sending it saved as a local description")

        sendSignal({
          type: 'answer',
          data: answer,
          targetUser: signal.sender || "raj"
        });
        console.log("answer is send to krishna")
      } catch (error) {
        console.error("Failed to answer call. Camera access denied or busy:", error);
      }

    } 
    else if (signal.type === 'answer') {
      // User A gets the answer
      console.log("Krishna recieved answer ")

      if (peerConnection.current?.signalingState === "have-local-offer") {
        console.log("chackenig have local offer or not then set to remoteDescriotn")
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.data));

        // Drain the waiting room for User A
        pendingIceCandidates.current.forEach(async (candidate) => {
          console.log("again setting all ice candidate from krishna side")
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
        pendingIceCandidates.current = [];
      } else {
        console.warn("Ignored Answer: State is", peerConnection.current?.signalingState);
      }

    } else if (signal.type === 'ice') {
      // Both users handle incoming network candidates
      console.log("ice requested ")

      if (peerConnection.current) {
        console.log("ice candidate set to addICECandiate using peer connection")
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal.data));
      } else {
        console.log("Queueing early ICE candidate...");
        pendingIceCandidates.current.push(signal.data);
      }
    }
  };

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
      </div>

      <button
        onClick={startCall}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Call RAJ
      </button>
    </div>
  );
};

export default Temp;