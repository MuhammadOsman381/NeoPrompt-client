"use client"
import { getUserData, editUser } from '@/api/User';
import React, { useEffect, useState } from 'react';
import { BiCollection } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

interface User {
    id: number;
    name: string;
    email: string;
    collections: number;
}

const Page = () => {
    const defaultUserData = {
        id: 0,
        name: "",
        email: "",
        collections: 0
    };

    const [userData, setUserData] = useState<User>(defaultUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleUserApiCall = async () => {
        const response = await getUserData();
        setUserData({
            id: response?.id,
            name: response?.name,
            email: response?.email,
            collections: response?.collections?.length
        });
        console.log(response);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleUpdateSubmit = async () => {
        try {
            const response = await editUser(updatedData);
            console.log("User updated:", response);
            setIsEditing(false);
            handleUserApiCall();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        handleUserApiCall();
    }, []);

    return (
        <div className="">
            <div className="px-5 py-6">
                {isEditing ? (
                    <div className="bg-white rounded-2xl shadow-md border-t-4 border-gray-300 p-6 max-w-lg mx-auto">
                        <h2 className="text-lg font-bold text-gray-800">Edit User</h2>
                        <div className="mt-4 space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={updatedData.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={updatedData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={updatedData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                onClick={handleUpdateSubmit}
                            >

                                Save
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md border-t-4 border-gray-300 p-6 max-w-lg mx-auto">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                                <p className="text-gray-600">{userData.email}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-row items-center justify-between">
                            <div>
                                <p className="text-gray-700">
                                    <span className="font-bold">Collections:</span> {userData.collections}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className="cursor-pointer edit-btn"
                                    onClick={() => {
                                        setIsEditing(true);
                                        setUpdatedData({
                                            name: userData.name,
                                            email: userData.email,
                                            password: ""
                                        });
                                    }}
                                >
                                    <FaEdit />
                                    Edit
                                </button>
                                <button className="cursor-pointer delete-btn">
                                    <MdDelete />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
