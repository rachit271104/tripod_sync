import React from "react";
import { Users, Video, MessageCircle, Settings, LogOut, User } from "lucide-react";

function SidebarLeft() {
    return (
        <aside className="group h-screen w-20 hover:w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-all duration-300 rounded-r-3xl p-5 flex flex-col justify-between text-white shadow-2xl border-r border-blue-500/20 overflow-hidden">

            {/* Top Section */}
            <div className="flex flex-col items-center gap-6">
                <h1 className="font-bold text-xl hidden group-hover:block text-blue-400">
                    Tripod
                </h1>

                <div className="flex flex-col gap-4 mt-10 w-full">
                    <SidebarItem icon={<Users />} label="Members" active />
                    <SidebarItem icon={<Video />} label="Video" />
                    <SidebarItem icon={<MessageCircle />} label="Chat" />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4 items-center w-full">
                {/* My Profile */}
                <div className="flex items-center gap-3 w-full cursor-pointer group/profile transition-all duration-300">
                    {/* Profile Picture */}
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-transparent group-hover/profile:border-blue-500 group-hover/profile:shadow-[0_0_8px_rgba(59,130,246,0.5)] flex-shrink-0 transition-all duration-300">
                        <img
                            src="../public/photoo.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Name & Role (visible when expanded) */}
                    <div className="hidden group-hover:block">
                        <p className="text-sm font-medium text-white">Rachit Gupta</p>
                        <p className="text-xs text-blue-400">Admin</p>
                    </div>
                </div>

                <SidebarItem icon={<Settings />} label="Settings" />
                <SidebarItem icon={<LogOut />} label="Logout" />
            </div>
        </aside>
    );
}

const SidebarItem = ({ icon, label, active }) => (
    <div
        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 w-full cursor-pointer ${active
            ? "bg-blue-600/30 text-blue-400 border border-blue-500/20"
            : "hover:bg-blue-600/10 text-gray-300 hover:text-blue-400"
            }`}
    >
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <span className="hidden group-hover:block text-sm">{label}</span>
    </div>
);

export default SidebarLeft;
