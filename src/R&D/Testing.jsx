import React, { useContext, useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import RNFS from 'react-native-fs';
import DownloadImg, { downloadFile } from './DownloadImg';
import Swiper from 'react-native-swiper';
import VariableContext from '../components/context/VariableContext';
import ImageCard from '../components/Photos/ImageCard';

export default function Testing() {
    const { syncedImgs } = useContext(VariableContext);

    async function test() {

    }

    return (
        <Swiper loop={false} index={0} showsPagination={false}>
            {
                syncedImgs.map((image) => (<ImageCard item={image} key={image.id} fullScreen={true} />))
            }
        </Swiper>
    )
}




/*
<View style={{ backgroundColor: 'red' }}><Text>Hello</Text></View>
<View style={{ backgroundColor: 'green' }}><Text>world</Text></View>
<View style={{ backgroundColor: 'blue' }}><Text>babu</Text></View>

Image
id: from server
synced: true/false




*/