import RNFS from 'react-native-fs';

export default async function DownloadImg(url, path, Token, setProgress = () => { }) {
    console.log('DownloadImg');

    const option = {
        fromUrl: url,
        toFile: path,
        headers: { Authorization: `Token ${Token}` },
        progress: (res) => {
            const progress = (res.bytesWritten / res.contentLength) * 100;
            // console.log(`Progress: ${progress.toFixed(2)}%`);
            setProgress(progress.toFixed(0))

        },
    }
    const result = RNFS.downloadFile(option)
    const response = await result.promise;
    if (response.statusCode === 200) {
        return true;
    } else {
        return false
    }


    // return new Promise((resolve, reject) => {
    //     RNFS.downloadFile({
    //         fromUrl: url,
    //         toFile: path,
    //         background: true,
    //         discretionary: true,
    //         headers: {
    //             Authorization: `Token ${Token}`
    //         },
    //         progress: (res) => {
    //             // const progress = (res.bytesWritten / res.contentLength) * 100;
    //             // console.log(`Progress: ${progress.toFixed(2)}%`);
    //         },
    //     })
    //         .promise.then((response) => {
    //             console.log('File downloaded!');
    //             resolve(response);
    //         })
    //         .catch((err) => {
    //             console.log('Download error:', err);
    //             reject(err)
    //         });
    // })
}
