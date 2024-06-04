import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { URI_Updater } from '../context/folderImages';
import DownloadImg from '../../R&D/DownloadImg';
import { API_BASE_URL } from '../API/base_url';
import RNFS from 'react-native-fs';
import VariableContext from '../context/VariableContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ImageCard({ item, fullScreen, index, navigation }) {
    const [img, setImg] = useState(require('../../images/image.jpg'));
    const { variables, setSyncedImgs } = useContext(VariableContext);
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        // console.log(index);
        // console.log(item.uri);
        update_uri();
    }, []);

    async function update_uri() {
        if (item.uri && await isImageUri(item.uri)) {
            setImg({ uri: item.uri });
        } else {
            const path = RNFS.DocumentDirectoryPath + `/${item.title}`;
            await DownloadImg(`${API_BASE_URL}/photu/download/${item.id}/0/`, path, variables.Token);
            const uri = 'file:///' + path;
            await URI_Updater(item.id, uri);
            setSyncedImgs((prev) => prev.map((img) => img.id === item.id ? { ...img, uri } : img));
            setImg({ uri: uri });
        }
    }

    if (fullScreen) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <Image
                    source={img}
                    style={{ width, height: item.height / (item.width / width) }}
                />
            </View>
        )
    } else {
        return <TouchableOpacity onPress={() => navigation.navigate('Image', { index })}><View><Image source={img} width={width / 4} height={width / 4} /></View></TouchableOpacity>
    }

}
{/* <View><Image source={img} width={width / 4} height={width / 4} /></View> */ }
// style={{ flex: 1, aspectRatio: 1 }} // Width full, height auto-adjusted

const isImageUri = async (uri) => {
    try {
        const response = await fetch(uri, { method: 'HEAD' });
        return true;
    } catch (error) {
        return false;
    }
};