"use client";
import { deleteCollection } from '@/api/Collection';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditScreen from '@/components/EditScreen';
import ChatScreen from '@/components/ChatScreen';
import { getCollectionWithChat } from '@/api/Chat';


interface ChatArray {
    id: number;
    prompt: string;
    response: string;
    created_at: string;
    updated_at: string;
}

interface Collection {
    id: number;
    title: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    chats: ChatArray[];
}

const Page = () => {
    const defaultEditData = {
        id: 0,
        title: "",
    }
    const [collectionArray, setCollectionArray] = useState<Collection[]>([]);
    const [showPromptScreen, setShowPromptScreen] = useState<boolean>(false);
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [showEditScreen, setShowEditScreen] = useState<boolean>(false);
    const [editData, setEditData] = useState<{ id: number, title: string }>(defaultEditData)
    const [refresher, setRefresher] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("")

    const handleCollectionCall = async () => {
        const response = await getCollectionWithChat();
        setCollectionArray(response);
    };

    const handleDeleteCollection = async (id: number,) => {
        await deleteCollection(id)
        setRefresher(!refresher)
    };

    const handleEditCollection = (data: Collection,) => {
        setShowEditScreen(true)
        setTitle(data.title)
        setEditData(
            {
                id: data.id,
                title: data.title
            }
        )
    }

    useEffect(() => {
        handleCollectionCall();
    }, [refresher]);

    return (
        <div id="main-content" className="  transition-all duration-500 flex items-center justify-center flex-col">
            <div id="card-screen" className="px-10 py-5 w-full max-h-screen">
                {!showPromptScreen && !showEditScreen &&
                    collectionArray?.length > 0 &&
                    collectionArray?.map((items, index) => (
                        <div
                            key={index}
                            className="card rounded-2xl shadow-md bg-white border-t-4 border-gray-300 px-5 py-6 cursor-pointer"
                        >
                            <h2
                                onClick={() => {
                                    setSelectedCollection(items);
                                    setShowPromptScreen(true);
                                }} className="text-2xl font-bold text-gray-700 mb-2">{items.title}</h2>
                            <p

                                onClick={() => {
                                    setSelectedCollection(items);
                                    setShowPromptScreen(true);
                                }}
                                id="description" className="description text-gray-600">
                                {items.chats.length > 0
                                    ? items.chats[items.chats.length - 1]?.prompt
                                    : "No Chat found"}
                            </p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button id="edit-btn" onClick={() => handleEditCollection(items)} className="edit-btn">
                                    <FaEdit />
                                    Edit
                                </button>
                                <button id="delete-btn" onClick={() => handleDeleteCollection(items.id)} className="delete-btn">
                                    <MdDelete />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                {showPromptScreen && selectedCollection && (
                    <ChatScreen setShowPromptScreen={setShowPromptScreen} setSelectedCollection={setSelectedCollection} selectedCollection={selectedCollection} />
                )}

                {
                    showEditScreen && (
                        <EditScreen editData={editData} setShowEditScreen={setShowEditScreen} setRefresher={setRefresher} refresher={refresher} />
                    )
                }

            </div>
        </div>
    );
};

export default Page;
