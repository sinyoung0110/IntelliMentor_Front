import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/voca`;

export const directAdd = async (data) => {
    try {
        const header = {
            headers: { "Content-Type": "application/json" }
          };
        const response = await axios.post(`${host}/create`, data,header);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
