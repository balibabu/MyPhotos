import { createContext, useEffect, useState } from "react";
import { createTable, customSqlExecution, deleteRow, fetchRows, insertRow } from "../Utility/CDatabase";
import { Confirmation } from "../Utility/Confirmation";
import { getFiles } from "./getFiles";
import askForMediaPermission from "../Utility/MediaPermission";
import fetchImages, { fetchSomeImages } from "../API/fetchImages";
import { insertMultipleRows } from "./insertMultipleRows";
import { getFoldersImages, localImageSyncer } from "./folderImages";

const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {

    const [variables, setVariables] = useState({});
    const [localImgs, setLocalImgs] = useState([]);
    const [folders, setFolders] = useState([]);
    const [syncedImgs, setSyncedImgs] = useState([]);

    useEffect(() => { performActions() }, []);
    // useEffect(() => { setImages() }, [folders]);
    useEffect(() => { syncingOps() }, [variables.Token, folders]);

    async function performActions() {
        await askForMediaPermission();
        await createTable('Folder', { path: 'VARCHAR PRIMARY KEY', syncedUpto: 'VARCHAR' }); // syncedUpto is mtime of last file from sorted files acc. mtime
        await createTable('Variables', { name: 'VARCHAR PRIMARY KEY', value: 'VARCHAR' });
        // await createTable('LocalSynced', { title: 'VARCHAR', size: 'VARCHAR', PRIMARY: 'KEY (title, size)' });
        await createTable('SyncedPhotos', { id: 'INTEGER PRIMARY KEY', title: 'VARCHAR', size: 'VARCHAR', height: 'INTEGER', width: 'INTEGER', uri: 'VARCHAR' });
        await getFolders();
        await getVariables();
    }

    async function syncingOps() {
        if (variables.Token) {
            const images = await getSyncedImages();
            const unsyncedImages = await syncServerImages(images);
            const tmp_syncedImgs = [...unsyncedImages, ...images];
            setSyncedImgs(tmp_syncedImgs);
            const localImgs = await getFoldersImages(folders);
            await localImageSyncer(localImgs, variables.Token, tmp_syncedImgs, setSyncedImgs);
            getSyncedImages() //from table
        }
    }

    async function syncServerImages(syncedImages) {
        const ids = syncedImages.map((img) => img.id);
        const images = await fetchSomeImages(variables.Token, ids)
        if (images) {
            console.log(images);
            await insertMultipleRows(images)
            return images;
        }
        return [];
    }

    async function getSyncedImages() {
        console.log('fetching synced images from table SyncedPhotos');
        const images = await fetchRows('SyncedPhotos');
        setSyncedImgs(images);
        return images;
    }

    async function setImages() {
        let images = [];
        for (let folder of folders) {
            const files = await getFiles(folder.path);
            images = [...images, ...files]
        }
        images.sort((a, b) => new Date(a.mtime) - new Date(b.mtime))
        setLocalImgs(images);
    }

    async function getFolders() {
        const items = await fetchRows('Folder');
        setFolders(items);
    }

    async function addFolder(path) {
        await insertRow('Folder', { path, syncedUpto: '' });
        getFolders();
    }

    async function removeFolder(path) {
        const status = await Confirmation('Remove Path', 'are you sure?');
        if (status) {
            await deleteRow('Folder', `path='${path}'`);
            getFolders();
        }
    }

    async function getVariables() {
        const items = await fetchRows('Variables');
        const _variables = {}
        for (let item of items) {
            _variables[item.name] = item.value
        }
        setVariables(_variables);
    }

    const contextData = {
        variables, setVariables, getVariables,
        localImgs, setLocalImgs,
        syncedImgs, setSyncedImgs,
        folders, setFolders, getFolders, addFolder, removeFolder
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}