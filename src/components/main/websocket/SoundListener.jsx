import { useEffect, useRef } from 'react';
import { useSelector, useStore } from 'react-redux';
import { toast } from 'react-toastify';

const SoundListener = () => {
    const callStatus = useSelector((state) => state.call.callStatus)
    const outgoingSound = useRef(new Audio('/sounds/dialing.mp3'));
    const incomingSound = useRef(new Audio('/sounds/ringing.mp3'));

    useEffect(() => {

        outgoingSound.current.loop = true;
        incomingSound.current.loop = true;

        return () => {
            stopAll();
        };
    }, []);

    const stopAll = () => {
        outgoingSound.current.pause();
        outgoingSound.current.currentTime = 0;
        incomingSound.current.pause();
        incomingSound.current.currentTime = 0;
    };

    useEffect(() => {
        let timer = null
        if (callStatus === 'calling') {
            stopAll();
            timer = setTimeout(() => {
                outgoingSound.current.play().catch(() => { });
            }, 300)
        }
        else if (callStatus === 'ringing') {
            stopAll();
            timer = setTimeout(() => {
                incomingSound.current.play().catch(() => { });
            }, 300)
        }
        else {
            stopAll();
            clearTimeout(timer);
        }



        return () => {
            stopAll();
        }

    }, [callStatus]);

    return null;
};

export default SoundListener;