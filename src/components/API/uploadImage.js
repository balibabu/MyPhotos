import { API_BASE_URL } from "./base_url";

export async function uploadImage(token, image) {
    console.log('uploadImage api');
    const formData = new FormData();
    formData.append('file', {
        uri: 'file:///' + image.path,
        type: 'image/png',
        name: image.name
    });

    try {
        const response = await fetch(`${API_BASE_URL}/photu/upload/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData,
        })
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}