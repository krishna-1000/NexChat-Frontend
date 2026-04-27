import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const useCallDuration = () => {
    const callStatus = useSelector((state) => state.call.callStatus)
    const [duration, setDuration] = useState(0)  
    const timerRef = useRef(null)

    useEffect(() => {
        if (callStatus === 'connected') {
            setDuration(0)
            timerRef.current = setInterval(() => {
                setDuration(prev => prev + 1)
            }, 1000)

        } else {
            clearInterval(timerRef.current)
            timerRef.current = null
            setDuration(0)
        }

        return () => clearInterval(timerRef.current)
    }, [callStatus])

    const formatted = () => {
        const hrs  = Math.floor(duration / 3600)
        const mins = Math.floor((duration % 3600) / 60)
        const secs = duration % 60

        const mm = String(mins).padStart(2, '0')
        const ss = String(secs).padStart(2, '0')

        if (hrs > 0) {
            return `${hrs}:${mm}:${ss}`  
        }
        return `${mm}:${ss}`           
    }

    return { duration, formatted: formatted() }
}

export default useCallDuration