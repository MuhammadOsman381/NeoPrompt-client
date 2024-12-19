import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa6';
import Loader from './Loader';
import { responseGenerator } from '@/api/Gemini';
import { addChatToCollection, getCollectionChat } from '@/api/Chat';

const PromptScreen = ({ collectionTitle, collection_id }: any) => {
    const [prompt, setPrompt] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<{ prompt: string; response: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);



    function removeEmptyStrings(array: string[]) {
        return array.filter(item => item !== "");
    }

    function formatResponse(text: string) {
        const paragraphs = text.trim().split('\n\n');
        let formattedText = '';
        paragraphs.forEach((item: string) => {
            if (item.trim().startsWith("**") && item.trim().endsWith("**")) {
                formattedText += `<strong class="text-xl text-gray-800">${item.trim().slice(2, -2)}</strong>`;
            } else if (item.trim().startsWith("*")) {
                const listItemsArray = item.trim().split("\n");
                formattedText += "<ul>";
                listItemsArray.forEach((listItem) => {
                    let formattedListItem = listItem.trim().slice(1).trim(); // Remove leading '*'
                    if (formattedListItem.trim().startsWith("**")) {
                        removeEmptyStrings(formattedListItem.trim().split("**")).map((items, index) => {
                            if (index === 0) {
                                formattedText += `<strong class="text-gray-700">${items.trim()}</strong>`;
                            } else {
                                formattedText += `<li>${items.trim()}</li>`;
                            }
                        });
                    } else {
                        formattedText += `<li>${formattedListItem.trim()}</li>`;
                    }
                });
                formattedText += "</ul>";
            } else {
                formattedText += `<p>${item.trim()}</p>`;
            }
        });

        return formattedText;
    }



    async function sendPrompt(event: FormEvent) {
        event.preventDefault();
        setChatHistory(prev => [...prev, { prompt, response: "" }]);
        setLoading(true);
        try {
            const response = await responseGenerator(prompt);
            const formattedResponse = await formatResponse(response);
            setChatHistory(prev => {
                const updatedHistory = [...prev];
                updatedHistory[updatedHistory.length - 1].response = formattedResponse;
                return updatedHistory;
            });
            const data = {
                prompt: prompt,
                response: formattedResponse
            }
            await addChatToCollection(data, collection_id)
        } catch (error) {
            console.error("Error generating response:", error);
        } finally {
            setLoading(false);
            setPrompt("");
        }
    }


    const handleCollectionChat = async () => {
        const chat = await getCollectionChat(collection_id)
        setChatHistory(chat)
    }

    useEffect(() => {
        handleCollectionChat()
    }, [])



    return (
        <form
            onSubmit={sendPrompt}
            className=" transition-all duration-500 flex flex-col items-center justify-center max-w-full h-[90vh]"
        >
            <div className=" transition-all duration-500 flex flex-col items-center justify-center max-w-full h-[90%]">
                <div className="flex-grow overflow-y-auto bg-transparent w-full flex flex-col items-center justify-center gap-2">
                    <h1 className="font-bold px-10 w-full text-start text-gray-700 text-2xl">
                        {collectionTitle}
                    </h1>
                    <div className="chat-box element flex-grow overflow-y-auto p-4 bg-transparent w-full flex flex-col gap-2">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className="chat-message">
                                <div className="prompt bg-white p-4 text-lg font-bold rounded-xl mb-2">
                                    {chat.prompt}
                                </div>
                                {chat.response ? (
                                    <div
                                        className="response bg-white p-4 rounded-xl"
                                        dangerouslySetInnerHTML={{ __html: chat.response }}
                                    />
                                ) : (
                                    loading && <Loader />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-200 p-4 w-full rounded-3xl mb-5">
                        <div className="flex items-center gap-2">
                            <input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                type="text"
                                id="chat-input"
                                placeholder="Type your message..."
                                className="chat-input flex-grow p-2 bg-transparent border-none rounded focus:outline-none text-gray-500"
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-3 py-3 rounded-full hover:bg-black"
                                disabled={loading}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PromptScreen;
