import axios from "axios";
import { Confirmation } from "../Utility/Confirmation";
import { API_BASE_URL } from "../API/base_url";

export async function login(username, password) {
    console.log('login api');
    try {
        const res = await axios.post(`${API_BASE_URL}/user/login/`, { username, password });
        if (res.status === 200) {
            return res.data.token;
        }
        return '';
    } catch (error) {
        console.log(error);
        Confirmation('Invalid', 'either your username or password is incorrect', { proceed: 'ok' });
    }
}