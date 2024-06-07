import axios from "axios";
import { API_BASE_URL } from "./base_url";

export async function deleteImg(token, id) {
    console.log('deleteImg api');
    try {
        const res = await axios.delete(`${API_BASE_URL}/photu/delete/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (res.status === 204) {
            return true;
        }
        console.log(res);
        return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}