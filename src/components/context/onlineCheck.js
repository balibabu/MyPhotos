import axios from "axios";
import { API_BASE_URL } from "../API/base_url";

export default async function isOnline(token) {
    console.log('isOnline');
    try {
        const response = await axios.get(`${API_BASE_URL}/user/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        if(response.status===200){
            return response.data.username;
        }else{
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}