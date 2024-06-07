import DownloadImg from '../Utility/DownloadImg';
import WaitFor from '../Utility/Waiter';
import RNFS from 'react-native-fs';
import { URI_Updater } from '../context/folderImages';
import { API_BASE_URL } from '../API/base_url';
import { isImageUri } from './ImageCard';

export const all_tasks = [];
let status = false;
export function AddTask(task) {
    all_tasks.push(task);
    if (!status) {
        working();
    }
}

async function working() {
    status = true;
    while (all_tasks.length > 0) {
        task = all_tasks.shift()
        if (task.type === 'download') {
            await task_downloader(task);
        }
        console.log('remaining', all_tasks.length);
    }
    status = false;
}

async function task_downloader(task) {
    const item = task.item;
    const path = RNFS.DocumentDirectoryPath + `/${item.title}`;
    if (! await isImageUri('file:///' + path)) {
        const status = await DownloadImg(`${API_BASE_URL}/photu/download/${item.id}/0/`, path, task.others.token);
        if (!status) { return }
    }
    const uri = 'file:///' + path;
    await URI_Updater(item.id, uri, 0);
    task.others.setSyncedImgs((prev) => prev.map((img) => img.id === item.id ? { ...img, uri, quality: 0 } : img));
}