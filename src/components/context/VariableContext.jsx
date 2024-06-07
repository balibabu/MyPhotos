import { createContext, useEffect, useState } from "react";
import { createTable, customSqlExecution, deleteRow, fetchRows, insertRow } from "../Utility/CDatabase";
import { Confirmation } from "../Utility/Confirmation";
import { getFiles } from "./getFiles";
import askForMediaPermission from "../Utility/MediaPermission";
import fetchImages, { fetchSomeImages } from "../API/fetchImages";
import { insertMultipleRows } from "./insertMultipleRows";
import { getFoldersImages, localImageSyncer } from "./folderImages";
import { createTables } from "./createTables";
import isOnline from "./onlineCheck";
import WaitFor from "../Utility/Waiter";
import RNFS from 'react-native-fs';
import { deleteImg } from "../API/deleteImg";

const VariableContext = createContext();
export default VariableContext;

const instantVars = {};
export const VariableProvider = ({ children }) => {

    const [variables, setVariables] = useState({});
    const [localImgs, setLocalImgs] = useState([]);
    const [folders, setFolders] = useState([]);
    const [syncedImgs, setSyncedImgs] = useState([]);

    useEffect(() => { performOfflineActions() }, []);

    async function performOfflineActions() {
        await askForMediaPermission();
        await createTables();
        await getSyncedImages();
        await getVariables();
        if (instantVars.variables.Token && await isOnline(instantVars.variables.Token)) {
            setVariables((prev) => ({ ...prev, online: true }));
            await performOnlineActions();
        } else {
            await getFolders();
        }
    }

    async function performOnlineActions() {
        await WaitFor(1000);
        await syncServerImages()
        await folderHasChanged();
    }

    async function folderHasChanged() {
        await getFolders();
        await WaitFor(2000);
        const localImgs = await getFoldersImages(instantVars.folders);
        await localImageSyncer(localImgs, instantVars.variables.Token, instantVars.syncedImgs, setSyncedImgs);
        console.log('all tasks completed');
    }

    async function syncServerImages() {
        const ids = instantVars.syncedImgs.map((img) => img.id);
        const images = await fetchSomeImages(instantVars.variables.Token, ids)
        if (images && images.length > 0) {
            await insertMultipleRows(images)
            setSyncedImgs((prev) => [...images, ...prev]);
            instantVars.syncedImgs = [...instantVars.syncedImgs, ...images];
            return images;
        } else {
            console.log('all imgs from server is here');
            return [];
        }
    }

    async function getSyncedImages() {
        console.log('fetching synced images from table SyncedPhotos');
        const images = await fetchRows('SyncedPhotos');
        setSyncedImgs(images.reverse());
        instantVars.syncedImgs = images;
        return images;
    }

    async function getFolders() {
        const items = await fetchRows('Folder');
        instantVars.folders = items;
        setFolders(items);
        return items;
    }

    async function addFolder(path) {
        await insertRow('Folder', { path, syncedUpto: '' });
        await folderHasChanged()
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
        instantVars.variables = _variables;
        return _variables;
    }

    async function deleteImage(image) {
        if (await Confirmation('Delete', 'image will be deleted from server too, are you sure?')) {
            const status = await deleteImg(instantVars.variables.Token, image.id);
            if (status) {
                await deleteRow('SyncedPhotos', `id=${image.id}`);
                await RNFS.unlink(image.uri);
                if (await RNFS.exists(image.uri)) {
                    Confirmation('Delete but Failed to delete from phone', 'manually delete from the folder', { proceed: 'ok', abort: '' });
                }
                if (await RNFS.exists(RNFS.DocumentDirectoryPath + `/${image.title}`)) {
                    RNFS.unlink(RNFS.DocumentDirectoryPath + `/${image.title}`);
                }
                setSyncedImgs((prev) => [...prev.filter((img) => img.id !== image.id)]);
            } else {
                Confirmation('Failed', 'something went wrong on server', { proceed: 'ok', abort: '' });
            }

        }
    }

    const contextData = {
        variables, setVariables, getVariables,
        localImgs, setLocalImgs,
        syncedImgs, setSyncedImgs,
        folders, setFolders, getFolders, addFolder, removeFolder,
        performOnlineActions, performOfflineActions, deleteImage
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}