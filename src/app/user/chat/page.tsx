"use client";
import { createCollection } from "@/api/Collection";
import { getUserName } from "@/api/User";
import PromptScreen from "@/components/PromptScreen";
import React, { FormEvent, useEffect, useState } from "react";

const Home = () => {
    const [collection, setCollection] = useState<string>("")
    const [name, setName] = useState<string>("");
    const [showPromptScreen, setShowPromptScreen] = useState<boolean>(false);
    const [collectionTitle, setCollectionTitle] = useState<string>("");
    const [collectionId, setCollectionId] = useState<number>(0)

    const handleCollection = async (event: FormEvent) => {
        event.preventDefault();
        const title: string = collection.split(" ").filter(item => item !== "").join("_").toLowerCase()
        const response = await createCollection(title)
        setShowPromptScreen(true)
        setCollectionTitle(response?.collectionTitle)
        setCollectionId(response?.collectionData?.id)
    }

    const handleUserName = async () => {
        const tempName = await getUserName()
        setName(tempName)
    }

    useEffect(() => {
        handleUserName()
    }, [])


    return (
        <div className=" w-auto p-5   h-[90vh] flex flex-col items-center justify-center   ">
            {
                showPromptScreen === false && (
                    <form id="border "
                        onSubmit={handleCollection}
                        className=" transition-all duration-500 w-auto">

                        <div className=" h-auto ">
                            <div className="content-container">
                                <span className="title">{`Welcome back, ${name},`}</span>
                                <span className="subtitle">How can I assist you today?</span>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="input-field"
                                        className="input-field"
                                        placeholder="Enter your collection name"
                                        onChange={(e) => setCollection(e.target.value)}
                                        value={collection}
                                    />
                                    <button
                                        className="submit-button"  >Submit</button>
                                </div>
                            </div>
                        </div>
                    </form >
                )
            }

            {
                showPromptScreen === true && (
                    <PromptScreen collectionTitle={collectionTitle} collection_id={collectionId} />
                )
            }

        </div>
    );
};

export default Home;
