"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserSideBar = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogOut = () => {
        localStorage.clear();
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className="relative flex">
            <div
                id="sidebar"
                className={`bg-white shadow-md h-screen w-64 fixed top-0 left-0 pt-16 transform transition-transform duration-500 z-20 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <ul className="space-y-4 px-4">
                    <li>
                        <Link
                            href="/user/chat"
                            className="block p-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold"
                        >
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/user/history"
                            className="block p-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold"
                        >
                            History
                        </Link>
                    </li> <li>
                        <Link
                            href="/user/profile"
                            className="block p-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={handleLogOut}
                            href="/"
                            className="block p-2 bg-black text-white hover:bg-gray-900 rounded-xl font-semibold px-5"
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>

            {isSidebarOpen && window.innerWidth <= 768 && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                ></div>
            )}

            <div
                className={`flex-1 transition-all duration-500 ${isSidebarOpen && window.innerWidth > 768 ? "ml-64" : "ml-0"
                    }`}
            >
                <nav
                    id="navbar"
                    className="bg-black transition-all duration-500 text-white px-4 py-4  w-full flex justify-start gap-3 items-center z-30"
                >
                    <button
                        onClick={toggleSidebar}
                        className="text-white text-2xl focus:outline-none"
                    >
                        ☰
                    </button>
                    <Link href="/user">
                        <div className="text-xl font-bold">My-App</div>
                    </Link>
                </nav>

                <main className=" ">{children}</main>
            </div>
        </div>
    );
};

export default UserSideBar;
