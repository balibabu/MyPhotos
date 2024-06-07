
async function uploadImage(image) {

    const formData = new FormData();
    formData.append('file', {
        uri: 'file:///' + image.path,
        type: 'image/png',
        name: image.name
    });

    try {
        const response = await fetch('https://.pythonanywhere.com/photu/upload/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token ',
            },
            body: formData,
        })
        console.log(response.status);

    } catch (error) {
        console.log(error);
    }
}