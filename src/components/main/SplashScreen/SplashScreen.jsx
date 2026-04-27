import React from 'react';

const SplashScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <span className="text-white text-4xl font-bold italic">N</span>
                </div>
                <h1 className="mt-6 text-2xl font-bold text-white tracking-widest uppercase">
                    NexChat
                </h1>
            </div>
            
            <div className="mt-10 flex flex-col items-center">
                
                <p className="mt-3 text-slate-400 text-sm font-medium">
                    Initializing secure connection...
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;