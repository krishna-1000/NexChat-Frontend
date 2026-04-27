import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegMessage } from 'react-icons/fa6';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { useSignup } from '../../hooks/useSignUp';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const SignUpForm = ({ onSubmitHandler }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const { formData, status, setStatus, timers, error, handleChange, handleSendOtp, handleVerifyOtp, handleFinalSubmit } = useSignup(onSubmitHandler);

    const requirements = [
        { label: "8+ characters", test: formData.password.length >= 8 },
        { label: "Mixed Case", test: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
        { label: "Numerical", test: /\d/.test(formData.password) },
        { label: "Special Char", test: /[@$!%*?&]/.test(formData.password) },
    ];

    const inputClass = (field) => `w-full font-mono text-sm text-cyan-100 placeholder-gray-600 bg-gray-800 rounded-xl px-10 py-3 border outline-none transition-all duration-200 ${status.focused === field ? "border-cyan-500 bg-gray-950 ring-1 ring-cyan-500" : "border-gray-700 hover:border-gray-600"}`;

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 border border-cyan-900 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-500 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <IoChatbubbleEllipsesOutline size={30} className="text-cyan-400" />                    </div>
                    <h1 className="text-3xl font-bold tracking-[0.2em] text-white">NEX<span className="text-cyan-400">CHAT</span></h1>
                    <p className="text-[10px] text-cyan-700 mt-1 tracking-widest font-mono uppercase">Welcome to Nexchat</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 bg-red-950/50 border border-red-900/50 rounded-xl px-4 py-3 mb-6 animate-pulse">
                        <FiAlertCircle size={16} className="text-red-500" />
                        <span className="text-red-400 text-xs font-mono">{error}</span>
                    </div>
                )}

                <form onSubmit={handleFinalSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] text-cyan-600 tracking-widest font-mono uppercase ml-1">Username</label>
                        <div className="relative">
                            <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 ${status.focused === 'username' ? 'text-cyan-400' : 'text-cyan-800'}`} />
                            <input name="username" value={formData.username} onChange={handleChange} onFocus={() => setStatus(s => ({ ...s, focused: "username" }))} onBlur={() => setStatus(s => ({ ...s, focused: "" }))} placeholder="USERNAME" className={inputClass("username")} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] text-cyan-600 tracking-widest font-mono uppercase ml-1">Email</label>
                        <div className="relative">
                            <MdEmail className={`absolute left-3 top-1/2 -translate-y-1/2 ${status.focused === 'email' ? 'text-cyan-400' : 'text-cyan-800'}`} />
                            <input name="email" type="email" value={formData.email} onChange={handleChange} onFocus={() => setStatus(s => ({ ...s, focused: "email" }))} onBlur={() => setStatus(s => ({ ...s, focused: "" }))} placeholder="EMAIL ADDRESS" className={inputClass("email")} />
                        </div>
                        {!status.verified ? (
                            status.otpSent ? (
                                <div className="flex gap-2 mt-2">
                                    <input name="otp" value={formData.otp} onChange={handleChange} placeholder="6-DIGIT OTP" className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm font-mono text-cyan-400 outline-none focus:border-cyan-500" maxLength={6} />
                                    <button onClick={handleVerifyOtp} disabled={timers.verify > 0} className="px-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 text-gray-700 text-[10px] font-bold rounded-xl transition-all">
                                        {timers.verify > 0 ? `WAIT ${timers.verify}s` : "VERIFY"}
                                    </button>
                                    <button onClick={handleSendOtp} disabled={timers.resend > 0} className="px-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-cyan-500 text-[10px] font-bold rounded-xl border border-gray-700">
                                        {timers.resend > 0 ? timers.resend : "RESEND"}
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleSendOtp} className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono  mt-1 ml-1 transition-colors">
                                    [ REQUEST VERIFICATION CODE ]
                                </button>
                            )
                        ) : (
                            <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-mono mt-1 ml-1 uppercase">
                                <FiCheckCircle /> Authentication Verified
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] text-cyan-600 tracking-widest font-mono uppercase ml-1">Password</label>
                        <div className="relative">
                            <FiLock className={`absolute left-3 top-1/2 -translate-y-1/2 ${status.focused === 'password' ? 'text-cyan-400' : 'text-cyan-800'}`} />
                            <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} onFocus={() => setStatus(s => ({ ...s, focused: "password", showRequirements: true }))} onBlur={() => setStatus(s => ({ ...s, focused: "", showRequirements: false }))} placeholder="PASSWORD" className={inputClass("password")} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-800 hover:text-cyan-400">
                                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                        {status.showRequirements && (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 p-3 bg-gray-800 rounded-xl border border-gray-800">
                                {requirements.map((req, i) => (
                                    <div key={i} className={`text-[9px] font-mono flex items-center gap-1.5 ${req.test ? 'text-cyan-400' : 'text-gray-300'}`}>
                                        <div className={`w-1 h-1 rounded-full ${req.test ? 'bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,1)]' : 'bg-gray-300'}`} />
                                        {req.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={status.loading} className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-800 disabled:text-gray-600 text-gray-950 font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 uppercase tracking-widest text-sm mt-4">
                        {status.loading ? "Processing..." : "Create Account"}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-mono bg-gray-900 px-2 text-gray-400 tracking-[0.3em]">or</div>
                </div>

                <p className="text-center text-xs text-gray-500 font-mono">
                    Already have an account{" "}
                    <button onClick={() => navigate("/login")} className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4 transition-colors">LOGIN</button>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;