import React from 'react';
import { RefreshCcw, AlertTriangle, MessageSquareOff } from 'lucide-react'; // Optional: Use Lucide icons or SVG

const MaintenancePage = () => {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="absolute w-96 h-96 bg-red-900/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-md w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative bg-slate-900 p-6 rounded-3xl border border-red-500/30">
                            <MessageSquareOff size={48} className="text-red-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        NexChat is <span className="text-red-500">Resting</span>
                    </h1>
                    <p className="text-slate-400 leading-relaxed">
                        Our servers are currently undergoing maintenance or are temporarily unreachable. We'll be back online in a few minutes.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                        Server Offline
                    </span>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleRetry}
                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 font-bold rounded-xl transition-all hover:bg-red-500 hover:text-white active:scale-95"
                    >
                        <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        Retry Connection
                    </button>
                    <p className="mt-4 text-xs text-slate-500">
                        Check your internet connection if the issue persists.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;