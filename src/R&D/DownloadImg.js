import RNFS from 'react-native-fs';

export default function DownloadImg(url, path, Token) {
    console.log('DownloadImg');
    return new Promise((resolve, reject) => {
        RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
            background: true,
            discretionary: true,
            headers: {
                Authorization: `Token ${Token}`
            },
            progress: (res) => {
                // const progress = (res.bytesWritten / res.contentLength) * 100;
                // console.log(`Progress: ${progress.toFixed(2)}%`);
            },
        })
            .promise.then((response) => {
                console.log('File downloaded!');
                resolve(response);
            })
            .catch((err) => {
                console.log('Download error:', err);
                reject(err)
            });
    })
}
