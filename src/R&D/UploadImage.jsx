
async function uploadImage(image) {

    const formData = new FormData();
    formData.append('file', {
        uri: 'file:///' + image.path,
        type: 'image/png',
        name: image.name
    });

    try {
        const response = await fetch('https://balib.pythonanywhere.com/photu/upload/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token 3fa825ddda4324fdb3dd3ee5b9b2cc042639e0ad',
            },
            body: formData,
        })
        console.log(response.status);

    } catch (error) {
        console.log(error);
    }
}