import Helpers from "@/config/Helpers";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Collection {
    id: number
    title: string
    user_id: number
}

const createCollection = async (title: string) => {
    try {
        const response = await axios.post(
            `${Helpers.apiUrl}create-collection`,
            { title },
            Helpers.authHeaders
        );
        const responseTitle = response.data.title
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        console.log(response.data)
        const collectionData: Collection = response.data
        return { collectionData, collectionTitle: responseTitle };
    } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred while creating the collection");
        throw error;
    }
};



const updateCollection = async (id: number, title: string) => {
    const response = await axios.put(`${Helpers.apiUrl}update-collection/${id}`, { title }, Helpers.authHeaders)
    return response
}

const deleteCollection = async (id: number) => {
    const response = await axios.delete(`${Helpers.apiUrl}delete-collection/${id}`, Helpers.authHeaders)
    return response
}


export { createCollection, updateCollection, deleteCollection };
