import axios from "axios";
import { API_BASE_URL } from "./base_url";

export default async function fetchImages(token) {
    console.log('getPhotos');
    try {
        const response = await axios.get(`${API_BASE_URL}/photu/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        });
        if (response.status === 200) {
            return response.data
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function fetchSomeImages(token, ids) {
    console.log('fetchSomeImages');
    try {
        // const response = await axios.post(`${API_BASE_URL}/photu/get/`, { ids: [...ids] }, {
        //     headers: {
        //         'Authorization': `Token ${token}`,
        //     }
        // });
        // if (response.status === 200) {
        //     return response.data
        // }
        const response = await fetch(`${API_BASE_URL}/photu/get/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: [...ids] }),
        });

        if (response.ok) {
            return await response.json();
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
