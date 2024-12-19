import Helpers from "@/config/Helpers";
import axios from "axios";

const getUserName = async () => {
    try {
        const response = await axios.get(`${Helpers.apiUrl}get-user`, Helpers.authHeaders)
        return response.data[0].name
    } catch (error) {
        return error
    }

}

const getUserData = async () => {
    try {
        const response = await axios.get(`${Helpers.apiUrl}get-user`, Helpers.authHeaders)
        return response.data[0]
    } catch (error) {
        return error
    }

}

const editUser = async (updatedData: { name: string, email: string, password: string }) => {
    try {
        const response = await axios.put(`${Helpers.apiUrl}update-user`, updatedData, Helpers.authHeaders)
        return response
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

export { getUserName, getUserData, editUser }