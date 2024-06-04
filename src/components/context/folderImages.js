import { uploadImage } from "../API/uploadImage";
import { customSqlExecution, insertRow } from "../Utility/CDatabase";
import { getFiles } from "./getFiles";

export async function getFoldersImages(folders) {
    console.log('fetching folders images');
    let images = [];
    for (let folder of folders) {
        const files = await getFiles(folder.path);
        images = [...images, ...files]
    }
    return images;
}

export async function localImageSyncer(images, token, tmp_syncedImgs, setSyncedImgs) {
    console.log('no of local img to sync =', images.length);
    for (let image of images) {
        const status = await isFileDuplicate(tmp_syncedImgs, image);
        if (!status) {
            try {
                const data = await uploadImage(token, image);
                const syncedImg = { id: data.id, title: data.title, size: data.size, height: data.height, width: data.width, uri: 'file:///' + image.path };
                await insertRow('SyncedPhotos', syncedImg)
                tmp_syncedImgs.push(syncedImg)
                setSyncedImgs([...tmp_syncedImgs]);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('aborting, duplicate image found');
        }
    }
}
export async function URI_Updater(id, uri) {
    const query = `UPDATE SyncedPhotos set uri='${uri}' where id=${id}`;
    await customSqlExecution(query);
}

async function isFileDuplicate(files, file) {  // file is local, files is from table
    for (let f of files) {
        if (file.name === f.title) {
            const uri = 'file:///' + file.path
            if (f.uri !== uri) {
                await URI_Updater(f.id, uri);
            }
            return true
        }
    }
    // console.log(files, file);
    return false
}