import { useState, useEffect } from 'react';
import { sendOtpApi, verifyOtpApi } from '../api/auth/signUpApi';
import { toast } from 'react-toastify';
export const useSignup = (onSubmitHandler) => {
    const [formData, setFormData] = useState({ username: "", password: "", email: "", otp: "" });
    const [status, setStatus] = useState({
        loading: false,
        otpSent: false,
        verified: false,
        focused: "",
        showRequirements: false
    });
    const [timers, setTimers] = useState({ resend: 0, verify: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prev => ({
                resend: Math.max(0, prev.resend - 1),
                verify: Math.max(0, prev.verify - 1)
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError("");
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setError("Invalid email format");

        setStatus(prev => ({ ...prev, loading: true }));
        try {
            await sendOtpApi({ email: formData.email.trim() });
            toast.success("Otp Sent")
            setStatus(prev => ({ ...prev, otpSent: true }));
            setTimers(prev => ({ ...prev, resend: 60 }));
            setError("");
        } catch (err) {
            console.warn(err)
            setError(err || "Failed to send OTP");
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (formData.otp.length < 6 || timers.verify > 0) return;

        try {
            const res = await verifyOtpApi({ email: formData.email, otp: formData.otp });
            if (res.status === 200) {
                setStatus(prev => ({ ...prev, verified: true }));
                setError("");
            }
        } catch (err) {
            setTimers(prev => ({ ...prev, verify: 10 }));
            setError(err|| "Invalid OTP");
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        if (!status.verified) return setError("Please verify your email first");

        setStatus(prev => ({ ...prev, loading: true }));
        try {
            await onSubmitHandler(formData);
        } catch (err) {
            setError(err);

        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    };

    return { formData, status, setStatus, timers, error, handleChange, handleSendOtp, handleVerifyOtp, handleFinalSubmit };
};

