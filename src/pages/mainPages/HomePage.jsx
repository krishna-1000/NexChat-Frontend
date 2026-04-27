import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen fixed inset-0 bg-slate-950 text-white selection:bg-blue-500/30 overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-600 rounded-full blur-[128px] opacity-20" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <div className="mb-8 group">
          <div className="w-20 h-20 bg-linear-to-tr from-cyan-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform group-hover:rotate-6 transition-transform duration-300 mx-auto">
            <span className="text-white text-4xl font-bold italic">N</span>
          </div>
          <h1 className="mt-6 flex text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            <span>Nex</span>Chat
          </h1>

        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm sm:max-w-none justify-center">
          <Link
            to="/login"
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-bold rounded-2xl transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-xl"
          >
            Login to Account
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl border border-slate-800 transition-all hover:bg-slate-800 hover:border-slate-700 active:scale-95"
          >
            Join NexChat
          </Link>
        </div>


      </div>
    </div>
  );

}

export default HomePage
