import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../context/VariableContext';
import ImageCard from './ImageCard';
import Swiper from 'react-native-swiper';
import { API_BASE_URL } from '../API/base_url';
import RNFS from 'react-native-fs';
import DownloadImg from '../Utility/DownloadImg';
import { URI_Updater } from '../context/folderImages';

export default function ViewFullImage(props) {
    const { syncedImgs, variables, setSyncedImgs } = useContext(VariableContext);
    const [index, setIndex] = useState(props.route.params.index);

    useEffect(() => {
        downloadFullImage(syncedImgs[index], variables.Token, setSyncedImgs);
    }, [index]);


    return (
        <Swiper loop={false} index={index} showsPagination={false} onIndexChanged={(i) => setIndex(i)}>
            {syncedImgs.map((image) => (<ImageCard item={image} key={image.id} fullScreen={true} />))}
        </Swiper>
    )
}

export function getBlobSizeFromURL(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => resolve(blob.size))
            .catch(error => reject(error));
    });
}

const initiatedTask = new Set();
async function downloadFullImage(item, token, setSyncedImgs) {
    if (!initiatedTask.has(item.id) && await getBlobSizeFromURL(item.uri) < 5000) {
        console.log('downloadFullImage started');
        initiatedTask.add(item.id);
        const path = RNFS.DocumentDirectoryPath + `/${item.title}`;
        await DownloadImg(`${API_BASE_URL}/photu/download/${item.id}/1/`, path, token);
        const uri = 'file:///' + path;
        await URI_Updater(item.id, uri);
        setSyncedImgs((prev) => [...prev.map((img) => img.id === item.id ? { ...img, uri } : img)]);
    }
}
