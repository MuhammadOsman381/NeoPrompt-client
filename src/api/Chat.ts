import Helpers from "@/config/Helpers"
import axios from "axios"
import { toast } from "react-toastify"

async function getCollectionChat(collection_id: number) {
    const response = await axios.get(`${Helpers.apiUrl}get-collection-chat/${collection_id}`, Helpers.authHeaders)
    return response?.data?.chat
}

const addChatToCollection = async (data: { prompt: string, response: string }, collection_id: number) => {

    const response = await axios.post(`${Helpers.apiUrl}create-chat/${collection_id}`, data, Helpers.authHeaders)
    if (response.data.message) {
        console.log(response.data.message)
    }
    else {
        toast.success(response.data.error)
    }
}

const getCollectionWithChat = async () => {
    try {
        const response = await axios.get(`${Helpers.apiUrl}get-user-collection-with-chat`, Helpers.authHeaders);
        return response.data
    } catch (error: any) {
        return error?.response?.data || error?.message;
    }
};



export { getCollectionChat, addChatToCollection, getCollectionWithChat }