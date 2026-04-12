

export const webRTC = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
    console.log(localStream.getTracks())
    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ]
    };
    

    const peerConnection = new RTCPeerConnection(configuration);
    //consoling peerconnection to see what does it have
    console.log(peerConnection)

    localStream.getTracks().forEach(track=>{
        peerConnection.addTrack(track,localStream);
    })

    //consoling peerconnection to see what does it have
    console.log(peerConnection)

}