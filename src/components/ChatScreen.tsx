import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

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

interface Chat {
    selectedCollection: Collection
    setSelectedCollection: React.Dispatch<React.SetStateAction<Collection | null>>
    setShowPromptScreen: React.Dispatch<React.SetStateAction<boolean>>
}


const ChatScreen = ({ setShowPromptScreen, setSelectedCollection, selectedCollection }: Chat) => {

    const handleDeleteChat = (id: number) => {
        console.log(id)
    }

    return (
        <div className="w-full flex flex-col items-start">
            <button
                onClick={() => {
                    setShowPromptScreen(false);
                    setSelectedCollection(null);
                }}
                className="text-white cursor-pointer  mb-4 bg-black p-2 rounded-xl ml-2  "
            >
                <FaArrowLeft className='cursor-pointer text-2xl' />
            </button>

            <h1 className="font-bold ml-2 w-full text-start text-gray-700 text-2xl">
                {selectedCollection.title}
            </h1>

            <div className="chat-box element flex-grow overflow-y-auto p-2 bg-transparent w-full  flex flex-col gap-2">
                {selectedCollection.chats.length > 0 ? (
                    selectedCollection.chats.map((chat: ChatArray, index: number) => (
                        <div key={index} className="chat-message  ">
                            <div className="prompt bg-white p-4 shadow text-lg font-bold rounded-xl mb-2 flex flex-row">
                                <span>{chat.prompt}</span>
                                <button onClick={() => handleDeleteChat(chat?.id)} className="delete-btn">
                                    <MdDelete />
                                </button>
                            </div>
                            {chat.response ? (
                                <div
                                    className="response bg-white p-4 rounded-xl shadow"
                                    dangerouslySetInnerHTML={{ __html: chat.response }}
                                />
                            ) : (
                                <p className="text-gray-500 italic">No response yet</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No chats available</p>
                )}
            </div>
        </div>
    )
}

export default ChatScreen