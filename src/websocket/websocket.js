import React, { useRef } from 'react'
import { Client } from "@stomp/stompjs";
import { toast } from 'react-toastify';

let stompClient = null;
let connectionRetries = 0;
let subscriptions = new Map();
export const stopConnection = () => {
    if (stompClient) {
        stompClient.deactivate();
        if (stompClient) {
            stompClient.forceDisconnect()

        }   
    }
}
export const connectToStomp = (onConnectCallback) => {
    if (stompClient && stompClient.connected) {
        if (onConnectCallback) onConnectCallback();
        return;
    }

    if (stompClient?.active) {
        if (connectionRetries > 50) {
            console.info("STOMP connection timeout.");
            connectionRetries = 0;
            stopConnection()
            return;
        }
        connectionRetries++;
        console.log(`Waiting for connection... attempt ${connectionRetries}`);
        setTimeout(() => connectToStomp(onConnectCallback), 100);
        return;
    }



    stompClient = new Client({
        brokerURL: import.meta.env.VITE_WS_URL,
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


    connectionRetries = 0;
}


export const subscribeToRoom = (roomId, onMessageReceived) => {
    if (!stompClient || !stompClient.connected) {
        setTimeout(() => subscribeToRoom(roomId, onMessageReceived), 500);
        return;
    }

    if (subscriptions.has(roomId)) {
        return;
    }
    try {
        const sub = stompClient.subscribe(`/topic/room.${roomId}`, (msg) => {

            try {
                const payload = JSON.parse(msg.body);
                onMessageReceived(payload);
            } catch (parseError) {
                console.error("Failed to parse message body:", msg.body);
            }
        });

        subscriptions.set(roomId, sub);
        console.log(`Subscribed to Room ${roomId}`);

    } catch (subError) {
        console.error(`Subscription failed for Room ${roomId}:`, subError);
    }

}

export const unsubscribeFromRoom = (roomId) => {
    if (subscriptions.has(roomId)) {
        subscriptions.get(roomId).unsubscribe();
        subscriptions.delete(roomId);
        console.log(`Unsubscribed from Room ${roomId}`);
    }
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        try {
            stompClient.publish({
                destination: "/app/chat.send",
                body: JSON.stringify(message)
            });
            return true;
        } catch (err) {
            console.error("STOMP publish error:", err);
            return false;
        }
    }
    console.error("Cannot send message: STOMP not connected.");
    return false;
};

export const sendSignal = (payload) => {
    if (stompClient && stompClient.connected) {

        try {
            console.log(payload)
            stompClient.publish({
                destination: "/app/webrtc-signal",
                body: JSON.stringify(payload)
            });
            return true;
        } catch (error) {
            console.error("can't send signal pulish error" + error)
            return false;
        }

    }
    console.error("Cannot send Signal: STOMP not connected.");
    return false;
}

export const subscribeToSignal = (onSignalReceived) => {
    if (!stompClient || !stompClient.connected) {
        console.warn("STOMP not connected. Retrying Signal subscription in 500ms...");
        setTimeout(() => subscribeToSignal(onSignalReceived), 500);
        return null;
    }

    try {
        const subscription = stompClient.subscribe("/user/queue/webrtc", (msg) => {
            try {
                const signal = JSON.parse(msg.body);
                onSignalReceived(signal);

            } catch (parseError) {
                console.error("WebRTC signal received:", msg.body);
            }
        });

        console.log("WebRTC Signaling Channel: ACTIVE");
        return subscription;

    } catch (error) {
        console.error("Signaling subscription failed:", error);
        return null;
    }
};
