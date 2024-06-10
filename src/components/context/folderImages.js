import { uploadImage } from "../API/uploadImage";
import { customSqlExecution, insertRow } from "../Utility/CDatabase";
import WaitFor from "../Utility/Waiter";
import { getFiles } from "./getFiles";
import RNFS from 'react-native-fs';

export async function getFoldersImages(folders) {
    console.log('fetching folders images');
    let images = [];
    for (let folder of folders) {
        const files = await getFiles(folder.path);
        images = [...images, ...files]
    }
    images.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    return images;
}

export async function localImageSyncer(images, token, setSyncedImgs, setSyncingImgs) {
    console.log('no of local img to sync =', images.length);
    for (let image of images) {
        try {
            const data = await uploadImage(token, image);
            if (data) {
                const syncedImg = { id: data.id, title: data.title, size: data.size, height: data.height, width: data.width, uri: 'file:///' + image.path, quality: 1 };
                await insertRow('SyncedPhotos', syncedImg)
                setSyncedImgs((prev) => [syncedImg, ...prev]);
                setSyncingImgs((prev) => [...prev.filter((img) => img.name !== image.name)]);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export async function URI_Updater(id, uri, quality) {
    console.log('URI_Updater', id);
    const query = `UPDATE SyncedPhotos set uri='${uri}', quality=${quality} where id=${id}`;
    await customSqlExecution(query);
}

export async function isFileDuplicate(files, file, setSyncedImgs) {  // file is local, files is from table
    for (let f of files) {
        if (file.name.trim() === f.title.trim()) {
            const uri = 'file:///' + file.path
            if (f.uri !== uri) {
                RNFS.unlink(uri)
                await URI_Updater(f.id, uri, 1);
                setSyncedImgs((prev) => [...prev.map((img) => img.id === f.id ? { ...img, uri, quality: 1 } : img)]);
            }
            return true
        }
    }
    // console.log(files, file);
    return false
}