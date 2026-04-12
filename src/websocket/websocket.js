import React, { useRef } from 'react'
import { Client } from "@stomp/stompjs";

let stompClient = null;
let subscriptions = new Map();
export const connectToStomp = (onConnectCallback) => {
    if (stompClient && stompClient.connected) {
        console.log("Already connected, firing callback.");
        if (onConnectCallback) onConnectCallback();
        return;
    }
    if (stompClient && stompClient.active) {
        console.log("Connection in progress... waiting.");
        setTimeout(() => connectToStomp(onConnectCallback), 100);
        return;
    }



    stompClient = new Client({
        brokerURL: "ws://localhost:8080/ws",
        reconnectDelay: 5000,
        connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        debug: (e) => {
            console.log(e)
        },
        onConnect: () => {
            console.log("CONNECTED TO SERVER")

            if (onConnectCallback) onConnectCallback();
        },
        onStompError: (frame) => {
            console.log(frame)
        },
    });
    stompClient.activate();

}

export const subscribeToRoom = (roomId, onMessageReceived) => {
    if (!stompClient || !stompClient.connected) {
        setTimeout(() => subscribeToRoom(roomId, onMessageReceived), 500);
        return;
    }

    if (subscriptions.has(roomId)) {
        return;
    }

    const sub = stompClient.subscribe(`/topic/room.${roomId}`, (msg) => {
        onMessageReceived(JSON.parse(msg.body));
    });

    subscriptions.set(roomId, sub);
    console.log(`Subscribed to Room ${roomId} 🚀`);
}

export const unsubscribeFromRoom = (roomId) => {
    if (subscriptions.has(roomId)) {
        subscriptions.get(roomId).unsubscribe();
        subscriptions.delete(roomId);
        console.log(`Unsubscribed from Room ${roomId} 🛑`);
    }
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.send",
            body: JSON.stringify(message)
        });
    }
};

export const sendSignal = (payload) => {
    if (stompClient && stompClient.connected) {
        payload.sender = "krishna"
        console.log(payload)
        stompClient.publish({
            destination: "/app/webrtc-signal",
            body: JSON.stringify(payload)
        });
    }
}

export const subscribeToSignal = (onSignalRecieved) => {
    console.log("aya")

    return stompClient.subscribe("/user/queue/webrtc", (msg) => {
        const signal = JSON.parse(msg.body);
        onSignalRecieved(signal);
    })
}
