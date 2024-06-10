import DownloadImg from "../Utility/DownloadImg";
import { API_BASE_URL } from "../API/base_url";
import { URI_Updater } from "../context/folderImages";
import RNFS from 'react-native-fs';

const initiatedTasks = new Set();
export default async function fullQualityDownloader(image, token, setSyncedImgs, setProgress = () => { }) {
    console.log('fullQualityDownloader');
    if (initiatedTasks.has(image.id)) { return }
    initiatedTasks.add(image.id);
    const path = RNFS.DocumentDirectoryPath + `/hq/${image.title}`;
    await checkDirectory();
    const status = await DownloadImg(`${API_BASE_URL}/photu/download/${image.id}/1/`, path, token, setProgress);
    if (!status) { return }
    const uri = 'file:///' + path;
    await URI_Updater(image.id, uri, 1);
    setSyncedImgs((prev) => prev.map((img) => img.id === image.id ? { ...img, uri, quality: 1 } : img));
    RNFS.unlink(RNFS.DocumentDirectoryPath + `/${image.title}`);
}

async function checkDirectory() {
    const path = RNFS.DocumentDirectoryPath + `/hq/`;
    const status = await RNFS.exists(path);
    if (!status) { await RNFS.mkdir(path) }
}