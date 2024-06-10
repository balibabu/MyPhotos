import React, { useContext, useEffect } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native';
import VariableContext from '../../context/VariableContext';
import ImgCard from './ImgCard';

export default function RenderSyncingImgs(props) {
    const { syncingImgs } = useContext(VariableContext);
    const columnCount = 3;

    useEffect(() => {
        if (syncingImgs.length > 0) {
            ToastAndroid.show(`Syncing ${syncingImgs.length} images`, ToastAndroid.LONG);
        }
    }, [syncingImgs.length > 0])

    return (
        <View className='p-1'>
            <FlatList
                data={syncingImgs}
                renderItem={({ item }) => <ImgCard {...{ image: item, columnCount }} />}
                keyExtractor={item => item.id}
                windowSize={columnCount}
                numColumns={columnCount}
            />
        </View>
    )
}
