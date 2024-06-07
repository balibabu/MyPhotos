import React, { useContext, useEffect } from 'react'
import { Dimensions, Image, View } from 'react-native'
import VariableContext from '../context/VariableContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddTask } from './Worker';

export default function ImageCard({ item, index, navigation, columnCount }) {
    const { variables, setSyncedImgs } = useContext(VariableContext);
    const { width } = Dimensions.get('window');

    useEffect(() => {
        update_uri();
    }, []);

    async function update_uri() {
        if (!(item.uri && await isImageUri(item.uri))) {
            AddTask({ type: 'download', item: item, others: { setSyncedImgs, token: variables.Token } })
        }
    }


    return (
        <TouchableOpacity onPress={() => navigation.navigate('FullImage', { index })}>
            <View><Image source={item.uri ? { uri: item.uri } : require('../../images/image.jpg')} width={width / columnCount} height={width / columnCount} /></View>
        </TouchableOpacity>
    );

}

export const isImageUri = async (uri) => {
    try {
        const response = await fetch(uri, { method: 'HEAD' });
        return true;
    } catch (error) {
        return false;
    }
};